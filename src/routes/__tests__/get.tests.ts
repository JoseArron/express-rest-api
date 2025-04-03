import request from "supertest";
import createServer from "../../server";
import { prisma } from "../../db/client";
import { mockNewStudent, mockStudents } from "../../mocks/mockStudents";
import { Student } from "@prisma/client";
import { v4 } from "uuid";

const app = createServer();
const route = "/api/students";

const runGetTests = () => {
    describe(`${route}`, () => {
        describe("/ GET endpoint", () => {
            it("should return an empty list when there are no students", async () => {
                const res = await request(app).get(route);

                expect(res.status).toBe(200);
                expect(res.body).toEqual([]);
            });

            it("should return a list of students when there are students", async () => {
                // add mock students to db
                await prisma.student.createMany({ data: mockStudents });

                const res = await request(app).get(route);

                expect(res.status).toBe(200);
                expect(res.body.length).toBe(mockStudents.length);
                expect(res.body[0]).toHaveProperty(
                    "firstName",
                    mockStudents[0].firstName
                );
                expect(res.body[1]).toHaveProperty(
                    "firstName",
                    mockStudents[1].firstName
                );
            });

            it("should return a 500 error when the database connection fails", async () => {
                // mock the findMany method on prisma.student table
                const findManySpy = jest.spyOn(prisma.student, "findMany");
                // raise a database connection error when the findMany method is called once
                findManySpy.mockRejectedValueOnce(
                    new Error("Database connection error")
                );

                const res = await request(app).get(route);

                expect(res.status).toBe(500);
                expect(res.body).toEqual({
                    message: "Failed to fetch students",
                });

                // restore the original function
                findManySpy.mockRestore();
            });
        });

        describe("/:id GET endpoint", () => {
            let createdStudent: Student;

            // add the student before each test under this describe
            beforeEach(async () => {
                createdStudent = await prisma.student.create({
                    data: mockNewStudent,
                });
            });

            it("should return the specific student with the given ID", async () => {
                const res = await request(app).get(
                    `${route}/${createdStudent.id}`
                );
                expect(res.status).toBe(200);
                expect(res.body).toBeDefined();
                expect(res.body.id).toBe(createdStudent.id);
                expect(res.body.firstName).toBe(mockNewStudent.firstName);
            });

            it("should fail with a status code of 404 if given a non-existent but valid ID", async () => {
                const nonExistentValidId = v4();

                const res = await request(app).get(
                    `${route}/${nonExistentValidId}`
                );
                expect(res.status).toBe(404);
                expect(res.body).toHaveProperty(
                    "message",
                    `Student with ${nonExistentValidId} not found`
                );
            });

            it("should fail with a status code of 500 if given an invalid ID", async () => {
                const invalidId = "this-is-not-a-valid-id";

                const res = await request(app).get(`${route}/${invalidId}`);
                expect(res.status).toBe(500);
                expect(res.body).toHaveProperty(
                    "message",
                    "Failed to fetch student"
                );
            });
        });
    });
};

export default runGetTests;
