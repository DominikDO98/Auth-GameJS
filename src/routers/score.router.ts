import type { Express, Request, Response } from "express";
import type { RpcConnectionManager } from "../../lib/broker/connectionManager.js";
import { ScoreController } from "../controllers/score.controller.js";
import { CustomRouter } from "./abstract.js";

export class ScoreRouter extends CustomRouter {
  private _controller: ScoreController;

  constructor(app: Express, broker: RpcConnectionManager) {
    super(app);
    this._controller = new ScoreController(broker);
  }
  initRoutes() {
    this.router.post("/", this.sendScore.bind(this));
    this.router.get("/leaderboard", this.getLeaderboard.bind(this));
    this.router.get("/personal/:userId", this.getPersonalBest.bind(this));
    this.app.use("/score", this.router);
  }
  private sendScore(req: Request, res: Response) {
    return this._controller.sendScore(req, res);
  }
  private getLeaderboard(req: Request, res: Response) {
    return this._controller.getLeaderboard(req, res);
  }
  private getPersonalBest(req: Request, res: Response) {
    return this._controller.getPersonalBest(req, res);
  }
}
