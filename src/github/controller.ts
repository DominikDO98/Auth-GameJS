import { HEADERS } from "constants/headers";
import { AUTHORIZE_URL, FRONTEND_URL } from "constants/urls";
import { Request, Response } from "express";
import { IGithubUserDO } from "types/githubUser";
import { v4 as uuid } from "uuid";
import { GithubService } from "./service";

export class GithubController {
  private _service = new GithubService();
  async requestUser(
    req: Request,
    res: Response
  ): Promise<IGithubUserDO | void> {
    try {
      const user = await this._service.requestUser(req);
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
      await this._service.requestAccess(req, res);
      res.clearCookie("State");
      res.set(HEADERS);
      res.set({
        Location: FRONTEND_URL,
      });
      res.status(302);
      res.send();
    } catch (e) {
      res.clearCookie("State");
      console.error(e);
      res.sendStatus(500);
    }
  }

  redirectUser(_req: Request, res: Response) {
    try {
      const state = uuid();
      res.cookie("State", state);
      res.set(HEADERS);
      res.set({
        Location: `${AUTHORIZE_URL}&state=${state}`,
      });
      res.status(302);
      res.send();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  logOut(_req: Request, res: Response) {
    try {
      res.clearCookie("Authorization");
      res.clearCookie("LoggedIn");
      res.send();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
}
