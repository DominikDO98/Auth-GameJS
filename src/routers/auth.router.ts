import { Request, Response } from "express";
import { AuthController } from "contorllers/auth.controller";
import { CustomRouter } from "./abstract";

export class AuthRouter extends CustomRouter {
  private _controller = new AuthController();

  constructor() {
    super();
    this.initRoutes();
  }
  private initRoutes() {
    this.router.get("/", this.requestAccess.bind(this));
    this.router.get("/login", this.redirectUser.bind(this));
    this.router.get("/user", this.requestUser.bind(this));
    this.router.get("/logout", this.logOut.bind(this));
  }
  requestUser(req: Request, res: Response) {
    return this._controller.requestUser(req, res);
  }
  requestAccess(req: Request, res: Response) {
    return this._controller.requestAccess(req, res);
  }
  redirectUser(req: Request, res: Response) {
    return this._controller.redirectUser(req, res);
  }
  logOut(req: Request, res: Response) {
    return this._controller.logOut(req, res);
  }
}
