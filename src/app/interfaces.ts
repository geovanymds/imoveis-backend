import { Express } from "express";
import { IMainRouter } from "../routes/interfaces";

// App architecture types
export interface IApp {
  express: Express;
  router: IMainRouter;
  middlewares(): void;
  mongoConnect(): void;
}
