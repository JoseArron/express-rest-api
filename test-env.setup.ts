import dotenv from "dotenv";

// use the test env
dotenv.config({ path: ".env.test" });
console.log(`Test database is running at ${process.env.DATABASE_URL}`);
