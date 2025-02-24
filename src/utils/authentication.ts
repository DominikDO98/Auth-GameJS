import { HEADERS } from "constants/headers";
import { AUTHORIZE_URL, FRONTEND_URL } from "constants/urls";
import { Request, Response } from "express";
import { GithubConnection } from "github/connection";
import { MongoRepository } from "mongo /reposiotory";
import { v4 as uuid } from "uuid";

export class Authentication {
  private _github = new GithubConnection();
  private _mongo = new MongoRepository();

  private validateState(req: Request) {
    if (
      !req.query.state ||
      !req.cookies.State ||
      req.query.state !== req.cookies.State
    )
      throw new Error("Wrong state parameter!");
  }

  async signUser(req: Request) {
    await this._github.requestUser(req);
  }

  async getToken(req: Request, res: Response) {
    if (!req.cookies.Authorization) {
      this.validateState(req);
      await this._github.requestAccess(req, res);
    }
    res.set(HEADERS);
    res.set({
      Location: FRONTEND_URL,
    });
    res.status(302);
    res.send();
  }

  redirectUser(_req: Request, res: Response) {
    const state = uuid();
    res.cookie("State", state);
    res.set(HEADERS);
    res.set({
      Location: `${AUTHORIZE_URL}&state=${state}`,
    });
    res.status(302);
    res.send();
  }
}
