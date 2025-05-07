import "dotenv/config";
import express from "express";
import { RpcConnectionManager } from "../lib/broker/connectionManager.js";
import { logger } from "../lib/logger/logger.js";
import { Middleware } from "./middleware/index.js";
import { MainRouter } from "./routers/index.js";

class App {
  port: number;
  app: express.Express;
  router: MainRouter;
  middleware: Middleware;
  broker: RpcConnectionManager;
  constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.app = express();
    this.broker = new RpcConnectionManager();
    this.router = new MainRouter(this.app, this.broker);
    this.middleware = new Middleware(this.app);
  }
  init() {
    try {
      this.middleware.initMiddleware();
      this.router.initRoutes();
      this.app.listen(this.port, "0.0.0.0", () => {
        logger.log(`Server is running on port ${this.port}...`, "App");
      });
    } catch (error) {
      logger.error(error as string, "APP.INIT", true);
      setTimeout(() => {
        this.init();
      }, Number(process.env.TIMEOUT) || 3600000);
    }
  }
}
new App().init();
