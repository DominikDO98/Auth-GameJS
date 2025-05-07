import type { ConsumeMessage } from "amqplib";
import { EQueues } from "../enums/queue.enum.js";
import type { IDifficultySettings, IMapDTO } from "../types/map.js";
import type { RpcConnectionManager } from "../../lib/broker/connectionManager.js";

export class MapService {
  private _broker: RpcConnectionManager;

  constructor(broker: RpcConnectionManager) {
    this._broker = broker;
  }

  private getStringContent(msg: ConsumeMessage | null): string | undefined {
    const data = msg?.content.toString();
    return data;
  }
  async getMap(diff: IDifficultySettings): Promise<IMapDTO> {
    let map;
    await this._broker.init().then(async () => {
      map = await this._broker.sendCall(
        EQueues.Map,
        JSON.stringify(diff),
        this.getStringContent
      );
    });
    await this._broker.disconnect();
    if (!map) throw new Error("No map received");
    return JSON.parse(map as string);
  }
}
