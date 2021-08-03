import * as mongoose from "mongoose";
import { ICorretor, tiposCorretor } from "./interfaces";

export class Corretor implements ICorretor {
  tipo: tiposCorretor;
  nome: string;
  creci: string;
  salario?: number;
  dataAdmissao?: Date;
  comissao: number;

  constructor({
    tipo,
    nome,
    creci,
    salario,
    dataAdmissao,
    comissao
  }: ICorretor) {
    this.tipo = tipo;
    this.nome = nome;
    this.creci = creci;
    if (tipo == 'Contratado') {
      this.comissao = 1;
      this.salario = salario;
      this.dataAdmissao = dataAdmissao;
    }
    else {
      this.comissao = comissao;
    }
  }
}


const CorretorSchema: mongoose.Schema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["Comissionado", "Contratado"],
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  creci: {
    type: String,
    unique: true,
    required: true,
  },
  salario: {
    type: Number,
    required: false,
  },
  dataAdmissao: {
    type: Date,
    required: false,
  },
  comissao: {
    type: Number,
    required: true,
  }
});

export interface CorretorDocument extends Corretor, mongoose.Document { }

export const CorretorModel = mongoose.model<CorretorDocument>(
  "Corretor",
  CorretorSchema
);
