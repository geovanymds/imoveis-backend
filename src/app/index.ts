import { IApp } from "./interfaces";
import express from "express";
import { Express } from "express";
import Connection from "../config/database/connection";

export default class App implements IApp {
  express: Express;

  constructor() {
    this.express = express();
    this.mongoConnect();
    this.middlewares();
    this.express.listen(process.env.PORT || 8000);
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  }

  mongoConnect() {
    const connection = new Connection();
    connection.init(connection.dbConnect);
  }

  middlewares() {
    this.express.use(express.json({ limit: "20mb" }));
    this.express.use(express.urlencoded({ extended: true, limit: "20mb" }));
  }
}
