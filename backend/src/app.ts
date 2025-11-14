import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("OK");
});

app.get("/", (req: Request, res: Response) => {
    res.send("API is running");
});

export default app;