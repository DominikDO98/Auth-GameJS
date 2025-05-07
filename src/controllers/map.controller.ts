import { MapService } from "../services/map.service";
import type { Request, Response } from "express";
import { logger } from "../../lib/src/logger/logger";
import { RpcConnection } from "../../lib/src/broker/connection";
import { IDifficultySettings } from "types/map";

export class MapController {
  private _service: MapService;

  constructor(broker: RpcConnection) {
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
