import { IGithubUser, IGithubUserDO } from "types/authetication";

export class GithubUserDO implements IGithubUserDO {
  id: number;
  login: string;
  avatarUrl: string;
  constructor(data: IGithubUser) {
    this.id = data.id;
    this.login = data.login;
    this.avatarUrl = data.avatar_url;
  }
}
