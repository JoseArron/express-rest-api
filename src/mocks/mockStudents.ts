import { StudentInput } from "../types/student";

export const mockStudents: StudentInput[] = [
    {
        firstName: "John",
        lastName: "Ce",
        groupName: "na",
        role: "Project Manager",
        expectedSalary: 750.0,
        expectedDateOfDefense: new Date("2024-05-15"),
    },
    {
        firstName: "Take",
        lastName: "A",
        groupName: "Look",
        role: "Frontend Developer",
        expectedSalary: 820.5,
        expectedDateOfDefense: new Date("2024-05-20"),
    },
    {
        firstName: "At",
        lastName: "Me",
        groupName: "now",
        role: "Backend Developer",
        expectedSalary: 6850.75,
        expectedDateOfDefense: new Date("2024-05-10"),
    },
];

export const mockNewStudent: StudentInput = {
    firstName: "Firstname",
    lastName: "Lastname",
    groupName: "Group 1",
    role: "Product Owner",
    expectedSalary: 200,
    expectedDateOfDefense: new Date("2024-05-11"),
};
