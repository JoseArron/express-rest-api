import { Student } from "@prisma/client";

export const students: Student[] = [
  {
    id: "1A1A1A1A1A1A1A1A1A1A1A1A1A1A1AAA",
    firstName: "John",
    lastName: "Ce",
    groupName: "na",
    role: "Project Manager",
    expectedSalary: 75000.0,
    expectedDateOfDefense: new Date("2024-05-15"),
  },
  {
    id: "2B2B2B2B2B2B2B2B2B2B2B2B2B2B2AAA",
    firstName: "Take",
    lastName: "A",
    groupName: "Look",
    role: "Frontend Developer",
    expectedSalary: 82000.5,
    expectedDateOfDefense: new Date("2024-05-20"),
  },
  {
    id: "3C3C3C3C3C3C3C3C3C3C3C3C3C3C3AAA",
    firstName: "At",
    lastName: "Me",
    groupName: "now",
    role: "Backend Developer",
    expectedSalary: 68500.75,
    expectedDateOfDefense: new Date("2024-05-10"),
  },
];
