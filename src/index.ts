import "dotenv/config";
import express from "express";
import { Middleware } from "middleware";
import { MainRouter } from "routers";
class App {
  app: express.Express;
  router: MainRouter;
  middleware: Middleware;

  constructor() {
    this.app = express();
    this.router = new MainRouter(this.app);
    this.middleware = new Middleware(this.app);
  }

  init() {
    this.middleware.initMiddleware();
    this.router.initRoutes();
    this.app.listen(3000, "localhost", () => {
      console.log("Server is running on port 3000...");
    });
  }
}

new App().init();
