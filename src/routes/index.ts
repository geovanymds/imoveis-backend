import ImovelRouter from "./Imovel";
import { Express } from "express";
import { IEntityRouter, IMainRouter } from "./interfaces";

export class MainRouter implements IMainRouter {
  routers: IEntityRouter[];

  constructor(express: Express) {
    this.routers = [];
    this.routers.push(new ImovelRouter());
    this.routers.forEach((router) => {
      express.use(router.uri, router.router);
    });
  }
}
