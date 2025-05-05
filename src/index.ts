import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { AuthRouter } from "routers/auth.router";
class App {
  private App = express();
  authRouter = new AuthRouter();

  init() {
    this.App.use(express.urlencoded({ extended: true }));
    this.App.use(express.json());
    this.App.use(cookieParser());
    this.App.use(cors({ origin: process.env.frontendURL, credentials: true }));

    this.App.use("/", this.authRouter.router);

    this.App.listen(3000, "localhost", () => {
      console.log("Server is running on port 3000...");
    });
  }
}

const app = new App().init();
