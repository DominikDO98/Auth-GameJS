import { Express, Request, Response } from "express";
import { CustomRouter } from "./abstract";
import { AuthRouter } from "./auth.router";
import { MapRouter } from "./map.router";
import { RpcConnection } from "../../lib/src/broker/connection";
import { ScoreRouter } from "./score.router";

export class MainRouter extends CustomRouter {
  private _authRouter;
  private _mapRouter;
  private _scoreRouter;

  constructor(app: Express, broker: RpcConnection) {
    super(app);
    this._authRouter = new AuthRouter(app);
    this._mapRouter = new MapRouter(app, broker);
    this._scoreRouter = new ScoreRouter(app, broker);
  }

  initRoutes() {
    this._authRouter.initRoutes();
    this._mapRouter.initRoutes();
    this._scoreRouter.initRoutes();
    this.initNotFound();
  }

  initNotFound() {
    this.app.all("*", (_req: Request, res: Response) => {
      res.sendStatus(404);
    });
  }
}
