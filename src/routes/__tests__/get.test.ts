import request from "supertest";
import { app } from "../../server";
import { prisma } from "../../db/client";
import { students as mockStudents } from "../../mocks/students";

const route = "/api/students";

describe("The students GET endpoint", () => {
  beforeAll(() => {
    prisma.student.createMany({ data: mockStudents });
  });

  afterAll(() => {
    prisma.student.deleteMany();
    prisma.$disconnect();
  });

  it("returns a list of the students", async () => {
    const res = await request(app).get(route);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it("returns a specific student", async () => {
    const res = await request(app).get(route + "/" + mockStudents[0].id);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});
