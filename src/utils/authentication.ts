import "dotenv/config";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export class Authentication {
  private _headers = {
    Accept: "application/json",
    "User-Agent": "http://localhost:3000",
  };
  private _params: string[] = [
    `response_type=code&client_id=${process.env.githubClientID}&redirect_uri=${process.env.baseURL}`,
  ];
  private _state: string | null = null;

  private generateState() {
    this._state = uuid();
  }
  private getHeaders(req: Request) {
    if (req.cookies.access_token)
      return {
        ...this._headers,
        Authorization: `Bearer ${req.cookies.access_token}`,
      };
    return this._headers;
  }
  redirectUser(res: Response) {
    this.generateState();
    if (!this._state) throw new Error("Oops! Something gone wrong!!!");
    res.cookie("State", this._state);
    return res.redirect(
      `${process.env.authorizeURL}?${this._params}&state=${this._state}`
    );
  }
}
