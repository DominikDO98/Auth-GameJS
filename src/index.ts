import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { MainRouter } from "routers";
class App {
  app: express.Express;
  router: MainRouter;
  constructor() {
    this.app = express();
    this.router = new MainRouter(this.app);
  }

  init() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors({ origin: process.env.frontendURL, credentials: true }));
    this.router.initRoutes();
    this.app.listen(3000, "localhost", () => {
      console.log("Server is running on port 3000...");
    });
  }
}

new App().init();
