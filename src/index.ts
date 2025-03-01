import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { Request, Response } from "express";
import { Authentication } from "utils/authentication";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/req", (req: Request, res: Response) => {
  console.log(req.cookies.Authorization);
  res.sendStatus(200);
});

app.get("/", (req: Request, res: Response) => {
  if (req.cookies.Authorization) {
    res.set({ Location: process.env.frontendURL });
    res.status(302);
    res.send();
  }
  if (!req.cookies.Authorization) new Authentication().getToken(req, res);
});

app.get("/login", (req: Request, res: Response) => {
  new Authentication().redirectUser(req, res);
});

app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000...");
});
