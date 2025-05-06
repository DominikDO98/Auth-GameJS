import { Express, Router, Request, Response } from "express";

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

  initNotFound() {
    this.app.all("*", (_req: Request, res: Response) => {
      res.sendStatus(404);
    });
  }
}
