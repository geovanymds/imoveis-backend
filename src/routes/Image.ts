import { Router } from "express";
import { ImageController } from "../controllers";
import { IEntityRouter } from "./interfaces";
import { IController, IImageController } from "../controllers/interfaces";
import multer from "multer";
import storage from "../config/uploads/multer";

export default class UserRouter implements IEntityRouter {
  uri: string;
  router: Router;
  controller: IController & IImageController;

  constructor() {
    this.uri = "/imagem";
    this.router = Router();
    this.controller = new ImageController();
    this.routes();
  }

  routes() {
    this.router.post(
      "/salvar",
      multer({ storage }).single("file"),
      this.controller.salvar
    );
  }
}
