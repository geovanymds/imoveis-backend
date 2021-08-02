import { Router } from "express";
import { IController, IImovelController } from "../controllers/interfaces";

export interface IEntityRouter {
  uri: string;
  router: Router;
  controller: IController;
  routes(): void;
}

export interface IMainRouter {
  routers: IEntityRouter[];
}
