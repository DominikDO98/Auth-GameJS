import { Express, Router } from "express";

export class CustomRouter {
  private _router;
  private _app;
  constructor(app: Express) {
    this._router = Router();
    this._app = app;
  }
  get router() {
    return this._router;
  }
  get app() {
    return this._app;
  }
}
