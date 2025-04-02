import request from "supertest";
import { app } from "../../server";
import { prisma } from "../../db/client";

describe("The GET routes", () => {
  beforeAll(() => {
    // const res = prisma.
  });

  describe("returns a list of the students", () => {
    const res = request(app).get("api/");
  });

  describe("returns a specific student", () => {});
});
