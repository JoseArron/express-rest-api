import request from "supertest";
import createServer from "../../server";
import { prisma } from "../../db/client";
import { mockNewStudent } from "../../mocks/mockStudents";
import { Student } from "@prisma/client";
import { v4 } from "uuid";

const app = createServer();
const route = "/api/students";

const runPostTests = async () => {
    describe(`${route}`, () => {
        describe("/ POST endpoint", () => {
            it("should return a json object of the new student on success", async () => {
                const res = await request(app).post(route).send(mockNewStudent);
                expect(res.status).toBe(201);
                expect(res.body).toBeDefined();
                expect(res.body.firstName).toBe(mockNewStudent.firstName);
            });
            it("should return a status code 500 if a data is missing or null", async () => {
                const invalidStudentFirstName = {
                    firstName: null,
                    lastName: "Lastname",
                    groupName: "Group 1",
                    role: "Product Owner",
                    expectedSalary: 200,
                    expectedDateOfDefense: new Date("2024-05-11"),
                };
                const res = await request(app)
                    .post(route)
                    .send(invalidStudentFirstName);
                expect(res.status).toBe(500);
                expect(res.body).toBeDefined();
                expect(res.body.message).toBe("Failed to create student");
            });
            it("should return a status code 500 if expected salary is not a number", async () => {
                const invalidStudentExpectedSalary = {
                    firstName: "Firstname",
                    lastName: "Lastname",
                    groupName: "Group 1",
                    role: "Product Owner",
                    expectedSalary: "abc",
                    expectedDateOfDefense: new Date("2024-05-11"),
                };
                const res = await request(app)
                    .post(route)
                    .send(invalidStudentExpectedSalary);
                expect(res.status).toBe(500);
                expect(res.body).toBeDefined();
                expect(res.body.message).toBe("Failed to create student");
            });
            it("should return a status code 500 if empty data is sent", async () => {
                const res = await request(app).post(route).send({});
                console.log(res.status, res.body);
                expect(res.status).toBe(500);
                expect(res.body).toBeDefined();
                expect(res.body.message).toBe("Failed to create student");
            });
        });
    });
};

export default runPostTests;
