import { Router } from "express";
import { CorretorController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, ICorretorController } from "../controllers/interfaces";

export default class UserRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & ICorretorController;

  constructor() {
    this.uri = "/corretor";
    this.router = Router();
    this.controller = new CorretorController();
    this.routes();
  }

  routes() {
    this.router.post("/cadastrar", this.controller.cadastrar);
    this.router.get("/listar", this.controller.listar);
    this.router.put("/alterar/:id", this.controller.alterar);
  }
}
