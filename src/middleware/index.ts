import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";

export class Middleware {
  private _app;
  constructor(app: Express) {
    this._app = app;
  }

  initMiddleware() {
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(express.json());
    this._app.use(cookieParser());
    this._app.use(cors({ origin: process.env.frontendURL, credentials: true }));
  }
}
