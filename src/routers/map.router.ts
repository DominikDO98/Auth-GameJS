import type { Express, Request, Response } from "express";
import type { RpcConnectionManager } from "../../lib/broker/connectionManager.js";
import { MapController } from "../controllers/map.controller.js";
import { CustomRouter } from "./abstract.js";

export class MapRouter extends CustomRouter {
  private _controller: MapController;

  constructor(app: Express, broker: RpcConnectionManager) {
    super(app);
    this._controller = new MapController(broker);
  }
  initRoutes() {
    this.router.post("/", this.getMap.bind(this));
    this.app.use("/map", this.router);
  }

  private getMap(req: Request, res: Response) {
    return this._controller.getMap(req, res);
  }
}
