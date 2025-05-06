import { Express } from "express";
import { CustomRouter } from "./abstract";
import { AuthRouter } from "./auth.router";

export class MainRouter extends CustomRouter {
  private _authRouter;

  constructor(app: Express) {
    super(app);
    this._authRouter = new AuthRouter(app);
  }

  initRoutes() {
    this._authRouter.initRoutes();
    this.initNotFound();
  }
}
