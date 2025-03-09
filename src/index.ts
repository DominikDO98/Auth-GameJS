import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { Authentication } from "utils/authentication";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.frontendURL, credentials: true }));

app.get("/", (req: Request, res: Response) => {
  new Authentication().getToken(req, res);
});

app.get("/login", (req: Request, res: Response) => {
  new Authentication().redirectUser(req, res);
});

app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000...");
});
