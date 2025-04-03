import runGetTests from "./get.tests";
import runPostTests from "./post.tests";
import runPutTests from "./put.tests";
// import { runDeleteTests } from "./delete.tests";
import { prisma } from "../../db/client";

describe("The students API", () => {
    beforeEach(async () => {
        await prisma.student.deleteMany();
    });

    // clear the test db after finishing testing
    afterAll(async () => {
        await prisma.student.deleteMany();
        await prisma.$disconnect();
    });

    runGetTests();
    runPostTests();
    runPutTests();
    // runDeleteTests();
});
