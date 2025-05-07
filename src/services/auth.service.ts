import { Request, Response } from "express";
import { IGithubUserDTO } from "types/githubUser";
import { GithubConnection } from "../github/connection";
import { GithubUserDTOMapper } from "../github/githubUser/DTO/mapper";

export class AuthService {
  private _connection = new GithubConnection();
  private validateState(req: Request) {
    if (
      !req.query.state ||
      !req.cookies.State ||
      req.query.state !== req.cookies.State
    ) {
      throw new Error("Wrong state parameter!");
    }
  }

  async requestAccess(req: Request, res: Response): Promise<void> {
    if (!req.cookies.Authorization) {
      this.validateState(req);
      await this._connection.requestAccess(req, res);
    }
  }

  async requestUser(req: Request): Promise<IGithubUserDTO | void> {
    const user = await this._connection.requestUser(req);
    if (!user) throw new Error("Unable to fetch user!");
    return new GithubUserDTOMapper().mapDTO(user);
  }
}
