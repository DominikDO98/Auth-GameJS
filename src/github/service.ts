import { IGithubUserDO } from "types/githubUser";
import { GithubConnection } from "./connection";
import { Request, Response } from "express";

export class GithubService {
  private _connection = new GithubConnection();
  private validateState(req: Request) {
    if (
      !req.query.state ||
      !req.cookies.State ||
      req.query.state !== req.cookies.State
    )
      throw new Error("Wrong state parameter!");
  }
  async requestAccess(req: Request, res: Response): Promise<void> {
    if (!req.cookies.Authorization) {
      this.validateState(req);
      await this._connection.requestAccess(req, res);
    }
  }
  async requestUser(req: Request): Promise<IGithubUserDO | void> {
    await this._connection.requestUser(req);
  }
}
