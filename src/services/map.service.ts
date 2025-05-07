import { ConsumeMessage } from "amqplib";
import { RpcConnection } from "../../lib/src/broker/connection";
import { IDifficultySettings, IMapDTO } from "types/map";
import { EQueues } from "enums/queue.enum";

export class MapService {
  private _broker: RpcConnection;

  constructor(broker: RpcConnection) {
    this._broker = broker;
  }

  private getStringContent(msg: ConsumeMessage | null): string | undefined {
    return msg?.content.toString();
  }
  async getMap(diff: IDifficultySettings): Promise<IMapDTO> {
    const map = await this._broker.sendCall(
      EQueues.Map,
      JSON.stringify(diff),
      this.getStringContent
    );
    if (!map) throw new Error("No msg received");
    return JSON.parse(map as string);
  }
}
