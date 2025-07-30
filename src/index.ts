import "dotenv/config";
import express from "express";
import { Middleware } from "middleware";
import { MainRouter } from "routers";
import { RpcConnection } from "../lib/src/broker/connection";
import { logger } from "../lib/src/logger/logger";

class App {
  app: express.Express;
  router: MainRouter;
  middleware: Middleware;
  broker: RpcConnection;
  constructor() {
    this.app = express();
    this.broker = new RpcConnection();
    this.router = new MainRouter(this.app, this.broker);
    this.middleware = new Middleware(this.app);
  }
  init() {
    this.broker.init();
    this.middleware.initMiddleware();
    this.router.initRoutes();
    this.app.listen(3000, "localhost", () => {
      logger.log("Server is running on port 3000...", "App");
    });
  }
}
new App().init();
