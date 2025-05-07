import type {
  IGithubUserDTO,
  IGithubUserDO,
} from "../../../types/githubUser.js";

export class GithubUserDTO implements IGithubUserDTO {
  id: number;
  login: string;
  avatarUrl: string;
  constructor(data: IGithubUserDO) {
    this.id = data.id;
    this.login = data.login;
    this.avatarUrl = data.avatarUrl;
  }
}
