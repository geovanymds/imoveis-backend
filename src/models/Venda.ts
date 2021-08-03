import * as mongoose from "mongoose";
import { IVenda } from "./interfaces";

export class Venda implements IVenda {
  codigoImovel: string;
  idCorretor: string;
  dataVenda: Date;
  valor: number;
  nomeComprador: string;


  constructor({
    codigoImovel,
    idCorretor,
    dataVenda,
    valor,
    nomeComprador
  }: IVenda) {
    this.codigoImovel = codigoImovel;
    this.idCorretor = idCorretor;
    this.dataVenda = dataVenda;
    this.valor = valor;
    this.nomeComprador = nomeComprador;
  }
}

const VendaSchema: mongoose.Schema = new mongoose.Schema({
  codigoImovel: {
    type: String,
    required: true,
  },
  idCorretor:{
    type: String,
    required: true,
  },
  dataVenda: {
    type: Date,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  nomeComprador: {
    type: String,
    required: true,
  }
});

export interface VendaDocument extends Venda, mongoose.Document {}

export const VendaModel = mongoose.model<VendaDocument>(
  "Venda",
  VendaSchema
);
