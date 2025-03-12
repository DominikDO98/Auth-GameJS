import { HEADERS } from "constants/headers";
import { AUTHORIZE_URL, FRONTEND_URL } from "constants/urls";
import { Request, Response } from "express";
import { GithubConnection } from "github/connection";
import { IGithubUserDO } from "types/githubUser";
import { v4 as uuid } from "uuid";

export class GithubController {
  private _connection = new GithubConnection();
  private validateState(req: Request) {
    if (
      !req.query.state ||
      !req.cookies.State ||
      req.query.state !== req.cookies.State
    )
      throw new Error("Wrong state parameter!");
  }

  async requestUser(
    req: Request,
    res: Response
  ): Promise<IGithubUserDO | void> {
    try {
      const user = await this._connection.requestUser(req);
      res.set(HEADERS);
      res.json(user);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  async requestAccess(
    req: Request,
    res: Response
  ): Promise<IGithubUserDO | void> {
    try {
      if (!req.cookies.Authorization) {
        this.validateState(req);
        await this._connection.requestAccess(req, res);
      }
      res.set(HEADERS);
      res.set({
        Location: FRONTEND_URL,
      });
      res.status(302);
      res.send();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
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
