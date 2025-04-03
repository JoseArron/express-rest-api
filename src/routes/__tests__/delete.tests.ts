import request from "supertest";
import createServer from "../../server";
import { prisma } from "../../db/client";
import { mockNewStudent } from "../../mocks/mockStudents";
import { Student } from "@prisma/client";
import { v4 } from "uuid";
import runGetTests from "./get.tests";

const app = createServer();
const route = "/api/students";

const runDeleteTests = async () => {
    describe(`${route}`, () => {
        describe("/:id DELETE endpoint", () => {
            let createdStudent: Student;

            // add the student before each test under this describe
            beforeEach(async () => {
                createdStudent = await prisma.student.create({
                    data: mockNewStudent,
                });
            });

            it("should return a json object of the deleted student on success", async () => {
                const res = await request(app).delete(
                    `${route}/${createdStudent.id}`
                );
                expect(res.status).toBe(200);
                expect(res.body).toBeDefined();
                expect(res.body.id).toBe(createdStudent.id);
                expect(res.body.firstName).toBe(mockNewStudent.firstName);
            });

            it("should return a status code 500 when the id is not found", async () => {
                const nonExistentValidId = v4();
                const res = await request(app).delete(
                    `${route}/${nonExistentValidId}`
                );
                expect(res.status).toBe(500);
                expect(res.body).toBeDefined();
                expect(res.body.message).toBe(
                    `Failed to delete student ${nonExistentValidId}`
                );
            });

            it("should return a status code 404 when no id is given", async () => {
                const res = await request(app).delete(`${route}/`);
                expect(res.status).toBe(404);
                expect(res.body).toBeDefined();
                expect(res.body.message).toBe(undefined);
            });
        });
    });
};

export default runDeleteTests;
