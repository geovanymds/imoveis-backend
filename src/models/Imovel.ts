import * as mongoose from "mongoose";
import { IImovel, tiposImovel } from "./interfaces";
import { TIPOS_DE_IMOVEIS } from "../utils/consts";

export class Imovel implements IImovel {
  codigo: string;
  tipo: tiposImovel;
  descricao: string;
  proprietarioDoImovel: string;
  precoSolicitado: number;
  imagem: string;
  dataDeCadastro: Date;
  vendido: boolean;

  constructor({
    codigo,
    tipo,
    descricao,
    proprietarioDoImovel,
    precoSolicitado,
    imagem,
    dataDeCadastro,
    vendido,
  }: IImovel) {
    this.codigo = codigo;
    this.tipo = tipo;
    this.descricao = descricao;
    this.proprietarioDoImovel = proprietarioDoImovel;
    this.precoSolicitado = precoSolicitado;
    this.imagem = imagem;
    this.dataDeCadastro = dataDeCadastro;
    this.vendido = vendido;
  }

  private listaTiposDeImoveis(): string[] {
    return [...TIPOS_DE_IMOVEIS];
  }
}

const ImovelSchema: mongoose.Schema = new mongoose.Schema({
  codigo: {
    type: String,
    unique: true,
    required: true,
  },
  tipo: {
    type: String,
    enum: [...TIPOS_DE_IMOVEIS],
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  proprietarioDoImovel: {
    type: String,
    required: true,
  },
  precoSolicitado: {
    type: Number,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  dataDeCadastro: {
    type: Date,
    required: true,
  },
  vendido: {
    type: Boolean,
    required: true,
  },
});

export interface ImovelDocument extends Imovel, mongoose.Document {}

export const ImovelModel = mongoose.model<ImovelDocument>(
  "Imovel",
  ImovelSchema
);
