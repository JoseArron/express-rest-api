/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    setupFilesAfterEnv: ["./test-env.setup.ts"],
};
