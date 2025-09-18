import type { IGithubUser, IGithubUserDO } from "../../../types/githubUser.js";
import { GithubUserDO } from "./DO.js";

export class GithubUserDOMapper {
  private validate(data: Record<string, unknown>) {
    if (Object.keys(data).length < 3) throw new Error("Data incompatible");
    if (!data.id || typeof data.id !== "number")
      throw new Error("Data incompatible");
    if (!data.login || typeof data.login !== "string")
      throw new Error("Data incompatible");
    if (!data.avatar_url || typeof data.avatar_url !== "string")
      throw new Error("Data incompatible");
  }

  private map(data: Record<string, unknown>): IGithubUser {
    return {
      id: Number(data.id),
      login: String(data.login),
      avatar_url: String(data.avatar_url),
    };
  }

  mapUser(data: Record<string, unknown>): IGithubUserDO {
    this.validate(data);
    return new GithubUserDO(this.map(data));
  }
}
