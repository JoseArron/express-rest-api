import { Student } from "@prisma/client";

export type StudentInput = Omit<Student, "id">;
