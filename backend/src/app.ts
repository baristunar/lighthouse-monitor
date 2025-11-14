import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import metricsRouter from './modules/metrics/metrics.controller.js';
import domainRouter from "./modules/domains/domain.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/domains", domainRouter);
app.use("/api/v1/metrics", metricsRouter);

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("OK");
});

app.get("/", (req: Request, res: Response) => {
    res.send("API is running");
});

export default app;