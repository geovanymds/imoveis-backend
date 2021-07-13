import { Mongoose } from "mongoose";
import mongoose from "mongoose";
import { IConnection } from "./interfaces";
import { config, uri } from "./mongo_config";

export default class Connection implements IConnection {
  connection: Mongoose | null;

  constructor() {
    this.connection = null;
  }

  init(callback: Function): void {
    callback.bind(this)();
  }

  async callbackInit(): Promise<void> {
    await this.dbConnect();
  }

  async dbConnect(): Promise<Mongoose> {
    try {
      console.log("URI: ", uri);
      console.log("CONFIG: ", config);
      const connection = await mongoose.connect(uri, config);
      this.connection = connection;
      console.log("Connected to the database.");
      return connection;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
