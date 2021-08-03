import { Router } from "express";
import { SalarioController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, ISalarioController } from "../controllers/interfaces";

export default class UserRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & ISalarioController;

  constructor() {
    this.uri = "/salario";
    this.router = Router();
    this.controller = new SalarioController();
    this.routes();
  }

  routes() {
    this.router.post("", this.controller.getSalario);
  }
}
