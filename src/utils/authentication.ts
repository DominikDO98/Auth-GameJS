import "dotenv/config";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export class Authentication {
  private _headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "http://localhost:3000",
  };

  private _authorizeParams: string[] = [
    `response_type=code&client_id=${process.env.githubClientID}&redirect_uri=${process.env.baseURL}`,
  ];

  private _tokenParams: string[] = [
    `grant_type=authorization_code&client_id=${process.env.githubClientID}&client_secret=${process.env.githubClientSecret}&redirect_uri=${process.env.baseURL}`,
  ];

  private _state: string | null = null;

  private generateState() {
    this._state = uuid();
  }

  private validateState(req: Request) {
    if (
      !req.query.state ||
      !req.cookies.State ||
      req.query.state !== req.cookies.State
    )
      throw new Error("Wrong state parameter!");
  }

  private getHeaders(req: Request) {
    if (req.cookies.access_token)
      return {
        ...this._headers,
        Authorization: `Bearer ${req.cookies.access_token}`,
      };
    return this._headers;
  }

  async getToken(req: Request, res: Response) {
    this.validateState(req);
    const access = await fetch(
      `${process.env.tokenURL}?${this._tokenParams}&code=${req.query.code}`,
      {
        headers: this.getHeaders(req),
      }
    );
    console.log(access.body);
  }

  redirectUser(req: Request, res: Response) {
    this.generateState();
    if (!this._state) throw new Error("Oops! Something gone wrong!!!");
    res.cookie("State", this._state);
    res.set(this.getHeaders(req));
    res.set({
      Location: `${process.env.authorizeURL}?${this._authorizeParams}&state=${this._state}`,
    });
    res.status(302);
    return res.send();
  }
}
