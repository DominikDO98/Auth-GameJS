import { HEADERS } from "constants/headers";
import { TOKEN_URL, USER_URL } from "constants/urls";
import { GithubUserDOMapper } from "DO/githubUser/mapper";
import { Request, Response } from "express";
import { IError, IGithubUserDO, IGrant } from "types/authetication";

export class GithubConnection {
  private _mapper = new GithubUserDOMapper();
  async requestUser(req: Request): Promise<IGithubUserDO | void> {
    return await fetch(USER_URL, {
      headers: { Authorization: req.cookies.Authorization },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this._mapper.mapUser(data as Record<string, unknown>);
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
        if ((data as IError).error || !data) {
          throw new Error("Authetication failed!");
        }
        res.cookie("Authorization", `Bearer ${(data as IGrant).access_token}`, {
          httpOnly: true,
          secure: true,
        });
      });
  }
}
