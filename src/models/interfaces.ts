export enum tiposImovel {
  casa = "Casa",
  apartamento = "Apartamento",
  salaComercial = "Sala Comercial",
  lote = "Lote",
  chacara = "Chacara",
  sitio = "Sitio",
  fazenda = "Fazenda",
}

export interface IImovel {
  codigo: string;
  tipo: tiposImovel;
  descricao: string;
  proprietarioDoImovel: string;
  precoSolicitado: number;
  imagem: string;
  dataDeCadastro: Date;
  vendido: boolean;
}

export enum tiposCorretor {
  comissionado = "Comissionado",
  contratado = "Contratado",
}

export interface ICorretor {
  tipo: tiposCorretor;
  nome: string;
  creci: string;
  salario?: number;
  dataAdmissao?: Date;
  comissao: number;
}

export interface IImage extends Document {
  nome: string;
  tamanho: number;
  nomeCompleto: string;
  url: string;
}

export interface IVenda {
  codigoImovel: string;
  creciCorretor: string;
  dataVenda: Date;
  valor: number;
  nomeComprador: string;
}
