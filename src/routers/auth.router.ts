import { AuthController } from "../controllers/auth.controller.js";
import type { Express, Request, Response } from "express";
import { CustomRouter } from "./abstract.js";

export class AuthRouter extends CustomRouter {
  private _controller = new AuthController();

  constructor(app: Express) {
    super(app);
  }
  initRoutes() {
    this.router.get("/", this.requestAccess.bind(this));
    this.router.get("/login", this.redirectUser.bind(this));
    this.router.get("/user", this.requestUser.bind(this));
    this.router.get("/logout", this.logOut.bind(this));
    this.app.use("/", this.router);
  }
  private requestUser(req: Request, res: Response) {
    return this._controller.requestUser(req, res);
  }
  private requestAccess(req: Request, res: Response) {
    return this._controller.requestAccess(req, res);
  }
  private redirectUser(req: Request, res: Response) {
    return this._controller.redirectUser(req, res);
  }
  private logOut(req: Request, res: Response) {
    return this._controller.logOut(req, res);
  }
}
