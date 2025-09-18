import type { Request, Response } from "express";
import type { RpcConnectionManager } from "../../lib/broker/connectionManager.js";
import { logger } from "../../lib/logger/logger.js";
import { MapService } from "../services/map.service.js";
import type { IDifficultySettings } from "../types/map.js";

export class MapController {
  private _service: MapService;

  constructor(broker: RpcConnectionManager) {
    this._service = new MapService(broker);
  }

  async getMap(req: Request, res: Response) {
    try {
      const diff: IDifficultySettings = req.body;
      const map = await this._service.getMap(diff);
      res.send(map);
    } catch (err) {
      logger.error(err as string, "Map Controller", true);
      res.sendStatus(500);
    }
  }
}
