import { Router } from "express";
import { RelatorioController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, IRelatorioController } from "../controllers/interfaces";

export default class UserRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & IRelatorioController;

  constructor() {
    this.uri = "/relatorio";
    this.router = Router();
    this.controller = new RelatorioController();
    this.routes();
  }

  routes() {
    this.router.post("", this.controller.getRelatorio);
  }
}
