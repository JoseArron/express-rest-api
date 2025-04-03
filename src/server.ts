import express from "express";
import cors from "cors";
import studentsRouter from "./routes/students";

const createServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/students", studentsRouter);
    return app;
};

export default createServer;
