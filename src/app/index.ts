import dotenv from "dotenv";
dotenv.config();
import { IApp } from "./interfaces";
import express, { Express, Request, Response } from "express";
import Connection from "../config/database/connection";
import { MainRouter } from "../routes";
import { IMainRouter } from "../routes/interfaces";
import errorHandler from "../middlewares/errorHandler";
import path from "path";
import cors from "../middlewares/cors";
import { NextFunction } from "express-serve-static-core";

export default class App implements IApp {
  express: Express;
  router: IMainRouter;

  constructor() {
    this.express = express();
    this.mongoConnect();
    this.middlewares();
    this.router = new MainRouter(this.express);
    this.handleError();
    this.express.listen(process.env.APP_PORT);
    console.log(`Listening on port ${process.env.APP_PORT}`);
  }

  mongoConnect() {
    const connection = new Connection();
    connection.init(connection.dbConnect);
  }

  middlewares() {
    this.express.use(cors);
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(
      "/imagem",
      express.static(path.resolve(__dirname, "..", "..", "public", "images"))
    );
    this.express.use((req: Request, res: Response) => {
      res.status(404).json({ message: "Resource not found." });
    });
  }

  handleError() {
    this.express.use(errorHandler);
  }
}
