import { MapController } from "controllers/map.controller";
import { Express, Request, Response } from "express";
import { RpcConnection } from "../../lib/src/broker/connection";
import { CustomRouter } from "./abstract";

export class MapRouter extends CustomRouter {
  private _controller: MapController;

  constructor(app: Express, broker: RpcConnection) {
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
