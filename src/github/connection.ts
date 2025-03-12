import { HEADERS } from "constants/headers";
import { TOKEN_URL, USER_URL } from "constants/urls";
import { GithubUserDOMapper } from "DO/githubUser/mapper";
import { Request, Response } from "express";
import { IError, IGrant, IMessage } from "types/authetication";
import { IGithubUserDO } from "types/githubUser";

export class GithubConnection {
  private _mapper = new GithubUserDOMapper();

  async requestUser(req: Request): Promise<IGithubUserDO | void> {
    return fetch(USER_URL, {
      headers: { Authorization: req.cookies.Authorization },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (!data || (data as IError).error || (data as IMessage).message)
          throw new Error("Authentication failed!");
        return this._mapper.mapUser(data as Record<string, unknown>);
      });
  }

  async requestAccess(req: Request, res: Response) {
    await fetch(`${TOKEN_URL}&code=${req.query.code}`, {
      headers: { ...HEADERS },
    })
      .then(async (data) => {
        return data.json();
      })
      .then((data) => {
        if (!data || (data as IError).error || (data as IMessage).message) {
          throw new Error("Authetication failed!");
        }
        res.cookie("Authorization", `Bearer ${(data as IGrant).access_token}`, {
          httpOnly: true,
          secure: true,
        });
      });
  }
}
