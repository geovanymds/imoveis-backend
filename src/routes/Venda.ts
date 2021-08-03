import { Router } from "express";
import { VendaController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, IVendaController } from "../controllers/interfaces";

export default class UserRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & IVendaController;

  constructor() {
    this.uri = "/venda";
    this.router = Router();
    this.controller = new VendaController();
    this.routes();
  }

  routes() {
    this.router.post("/cadastrar", this.controller.cadastrar);
    this.router.get("/listar", this.controller.listar);
    this.router.put("/alterar/:id", this.controller.alterar);
  }
}
