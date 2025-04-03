import request from "supertest";
import { prisma } from "../../db/client";
import { mockNewStudent } from "../../mocks/mockStudents";
import createServer from "../../server";
import { Student } from "@prisma/client";
import { StudentInput } from "../../types/student";
import { v4 } from "uuid";

const app = createServer();
const route = "/api/students";

const runPutTests = () => {
    describe(`${route}`, () => {
        describe(`${route}/:id PUT endpoint`, () => {
            let createdStudent: Student;

            beforeEach(async () => {
                createdStudent = await prisma.student.create({
                    data: mockNewStudent,
                });
            });

            it("should update an existing student with the given ID successfully", async () => {
                const newData: Partial<StudentInput> = {
                    groupName: "New Group",
                    expectedDateOfDefense: "2020",
                };

                const res = await request(app)
                    .put(`${route}/${createdStudent.id}`)
                    .send(newData);

                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty("groupName", newData.groupName);

                expect(res.body).toHaveProperty(
                    "expectedDateOfDefense",
                    new Date(newData.expectedDateOfDefense!).toISOString()
                );
            });

            it("should fail with a status code of 500 if the student with the given ID does not exist", async () => {
                const nonExistentId = v4();

                const newData: Partial<StudentInput> = {
                    groupName: "New Group",
                    expectedDateOfDefense: "2020",
                };

                const res = await request(app)
                    .put(`${route}/${nonExistentId}`)
                    .send(newData);

                expect(res.status).toBe(500);
                expect(res.body).toHaveProperty(
                    "message",
                    `Failed to update student ${nonExistentId}`
                );
            });

            it("should fail with a status code of 500 if the update data is invalid", async () => {
                const invalidNewData: Partial<StudentInput> = {
                    expectedDateOfDefense: "this is not a valid date",
                };

                const res = await request(app)
                    .put(`${route}/${createdStudent.id}`)
                    .send(invalidNewData);

                expect(res.status).toBe(500);
                expect(res.body).toHaveProperty(
                    "message",
                    `Failed to update student ${createdStudent.id}`
                );
            });
        });
    });
};

export default runPutTests;
