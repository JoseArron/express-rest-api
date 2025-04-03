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
                const createdStudent = res.body;
                expect(res.status).toBe(201);
                expect(res.body).toBeDefined();
                expect(res.body.id).toBe(createdStudent.id);
                expect(res.body.firstName).toBe(mockNewStudent.firstName);
            });
            it("should return a json object of the new student on success", async () => {});
        });
    });
};

export default runPostTests;
