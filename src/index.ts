import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({ hello: "world" });
});

app.listen(3000, "loclahost", () => {
  console.log("Server is running on port 3000...");
});
