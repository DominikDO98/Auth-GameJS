import { Router } from "express";

export class CustomRouter {
  protected _router = Router();
  get router() {
    return this._router;
  }
}
