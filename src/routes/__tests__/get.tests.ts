import request from "supertest";
import createServer from "../../server";
import { prisma } from "../../db/client";
import { mockNewStudent, mockStudents } from "../../mocks/mockStudents";
import { Student } from "@prisma/client";
import { v4 } from "uuid";

const app = createServer();
const route = "/api/students";

const runGetTests = async () => {
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
                expect(res.body.length).toBe(3);
                expect(res.body[0]).toHaveProperty(
                    "firstName",
                    mockStudents[0].firstName
                );
                expect(res.body[1]).toHaveProperty(
                    "firstName",
                    mockStudents[1].firstName
                );
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

            it("should return a specific student by the given ID", async () => {
                const res = await request(app).get(
                    `${route}/${createdStudent.id}`
                );
                expect(res.status).toBe(200);
                expect(res.body).toBeDefined();
                expect(res.body.id).toBe(createdStudent.id);
                expect(res.body.firstName).toBe(mockNewStudent.firstName);
            });

            it("should return 200 and null if given a non-existent but valid ID", async () => {
                const nonExistentValidId = v4();

                const res = await request(app).get(
                    `${route}/${nonExistentValidId}`
                );
                expect(res.status).toBe(200);
                expect(res.body).toBeNull();
            });

            it("should return 500 if given an invalid ID", async () => {
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
