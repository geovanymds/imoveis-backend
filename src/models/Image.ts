import mongoose, { Schema, Model } from "mongoose";
import { IImage } from "./interfaces";

const ImageSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  tamanho: {
    type: Number,
    required: true,
  },
  nomeCompleto: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export const ImageModel = mongoose.model<IImage>("Image", ImageSchema);
