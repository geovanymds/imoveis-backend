import { IApp } from "./interfaces";
import express, { Express } from "express";
import Connection from "../config/database/connection";
import { MainRouter } from "../routes";
import { IMainRouter } from "../routes/interfaces";
import cors from "cors";

export default class App implements IApp {
  express: Express;
  router: IMainRouter;

  constructor() {
    this.express = express();
    this.mongoConnect();
    this.middlewares();
    this.router = new MainRouter(this.express);
    this.express.listen(process.env.PORT || 8000);
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  }

  mongoConnect() {
    const connection = new Connection();
    connection.init(connection.dbConnect);
  }

  middlewares() {
    this.express.use(cors);
    this.express.use(express.json({ limit: "20mb" }));
    this.express.use(express.urlencoded({ extended: true, limit: "20mb" }));
  }
}
