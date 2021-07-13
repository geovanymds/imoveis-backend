import { Express } from "express";

// App architecture types
export interface IApp {
  express: Express;
  middlewares(): void;
  mongoConnect(): void;
}
