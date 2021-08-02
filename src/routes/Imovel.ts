import { Router } from "express";
import { ImovelController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, IImovelController } from "../controllers/interfaces";

export default class UserRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & IImovelController;

  constructor() {
    this.uri = "/imovel";
    this.router = Router();
    this.controller = new ImovelController();
    this.routes();
  }

  routes() {
    this.router.post("/cadastrar", this.controller.cadastrar);
    this.router.get("/listar", this.controller.listar);
    this.router.put("/alterar/:id", this.controller.alterar);
    this.router.delete("/deletar", this.controller.deletar);
  }
}
