import { Request, Response } from "express";
import { ScoreService } from "services/score.service";
import { RpcConnection } from "../../lib/src/broker/connection";
import { logger } from "../../lib/src/logger/logger";

export class ScoreController {
  private _service: ScoreService;

  constructor(broker: RpcConnection) {
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
