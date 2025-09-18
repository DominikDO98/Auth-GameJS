import type { Request, Response } from "express";
import { ScoreService } from "../services/score.service.js";
import { logger } from "../../lib/logger/logger.js";
import type { RpcConnectionManager } from "../../lib/broker/connectionManager.js";

export class ScoreController {
  private _service: ScoreService;

  constructor(broker: RpcConnectionManager) {
    this._service = new ScoreService(broker);
  }
  async sendScore(req: Request, res: Response) {
    try {
      const { score, userId, username, avatarUrl } = req.body;
      const returned = await this._service.sendScore(
        score,
        userId,
        username,
        avatarUrl
      );
      res.status(200).json(returned);
    } catch (err) {
      logger.error(err as string, "ScoreController.sendScore");
      res.sendStatus(500);
    }
  }
  async getPersonalBest(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const returned = await this._service.getPersonalBest(Number(userId));
      console.log(returned);
      res.status(200).json(returned);
    } catch (err) {
      logger.error(err as string, "ScoreController.sendScore");
      res.sendStatus(500);
    }
  }
  async getLeaderboard(_req: Request, res: Response) {
    try {
      const returned = await this._service.getLeaderboard();
      console.log(returned);
      res.status(200).json(returned);
    } catch (err) {
      logger.error(err as string, "ScoreController.sendScore");
      res.sendStatus(500);
    }
  }
}
