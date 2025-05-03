import { Request, Response } from "express";
import { GithubController } from "github/controller";

export class Authentication {
  private _github = new GithubController();
  async getUser(req: Request, res: Response) {
    await this._github.requestUser(req, res);
  }

  async getToken(req: Request, res: Response) {
    await this._github.requestAccess(req, res);
  }

  redirectUser(req: Request, res: Response) {
    this._github.redirectUser(req, res);
  }

  logout(req: Request, res: Response) {
    this._github.logOut(req, res);
  }
}
