import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { Authentication } from "utils/authentication";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  console.log(req.query, req.cookies.State);

  if (
    req.query.state &&
    req.cookies.State &&
    req.query.state === req.cookies.State
  )
    res.sendStatus(200);
  if (
    !req.query.state ||
    !req.cookies.State ||
    req.query.state !== req.cookies.State
  )
    res.sendStatus(403);
});
app.get("/login", (_req: Request, res: Response) => {
  new Authentication().redirectUser(res);
});

app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000...");
});
