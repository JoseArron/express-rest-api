import { Router } from "express";
import { prisma } from "../db/client";
import { StudentInput } from "../types/student";

const router = Router();

router.get("/", async (_req, res) => {
    prisma.student
        .findMany()
        .then((students) => {
            res.status(200).json(students);
        })
        .catch(() => {
            res.status(500).json({ message: "Failed to fetch students" });
        });
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    prisma.student
        .findUnique({ where: { id } })
        .then((student) => {
            // if the student is not found
            if (!student) {
                return res.status(404).json({
                    message: `Student with ${id} not found`,
                });
            }
            res.status(200).json(student);
        })
        .catch(() => {
            res.status(500).json({ message: "Failed to fetch student" });
        });
});

router.post("/", async (req, res) => {
    const data: StudentInput = req.body;
    prisma.student
        .create({
            data: {
                ...data,
                // convert received date string to Date object
                expectedDateOfDefense: new Date(data.expectedDateOfDefense),
            },
        })
        .then((student) => {
            res.status(201).json(student);
        })
        .catch(() => {
            res.status(500).json({ message: "Failed to create student" });
        });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const newData: Partial<StudentInput> = req.body;
    prisma.student
        .update({
            where: { id },
            data: {
                ...newData,
                // if expected date of defense is in newData, convert received date string to Date object
                ...(newData.expectedDateOfDefense && {
                    expectedDateOfDefense: new Date(
                        newData.expectedDateOfDefense
                    ),
                }),
            },
        })
        .then((student) => {
            res.status(201).json(student);
        })
        .catch(() => {
            res.status(500).json({ message: `Failed to update student ${id}` });
        });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    prisma.student
        .delete({
            where: { id },
        })
        .then((student) => {
            res.status(200).json(student);
        })
        .catch(() => {
            res.status(500).json({ message: `Failed to delete student ${id}` });
        });
});

export default router;
