import { Mongoose } from "mongoose";

export interface IConnection {
  connection: Mongoose | null;
  init(callback: Function): void;
  callbackInit(): Promise<void>;
  dbConnect(): Promise<Mongoose>;
}
