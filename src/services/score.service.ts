import { EQueues } from "../enums/queue.enum.js";
import type { ConsumeMessage } from "amqplib";
import type { RpcConnectionManager } from "../../lib/broker/connectionManager.js";

export class ScoreService {
  private _broker: RpcConnectionManager;

  constructor(broker: RpcConnectionManager) {
    this._broker = broker;
  }

  private getStringContent(msg: ConsumeMessage | null): string | undefined {
    return msg?.content.toString();
  }

  async sendScore(
    score: number,
    userId: number,
    username: string,
    avatarUrl: string
  ) {
    return await this._broker.sendCall(
      EQueues.Score,
      JSON.stringify({
        score: score,
        userId: userId,
        username: username,
        avatarUrl: avatarUrl,
      }),
      this.getStringContent
    );
  }
  async getPersonalBest(userId: number) {
    return await this._broker.sendCall(
      EQueues.PerosonalBest,
      JSON.stringify({ userId: userId }),
      this.getStringContent
    );
  }
  async getLeaderboard() {
    return await this._broker.sendCall(
      EQueues.Leaderboard,
      "",
      this.getStringContent
    );
  }
}
