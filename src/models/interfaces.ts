export enum tiposImovel {
  casa = "Casa",
  apartamento = "Apartamento",
  salaComercial = "Sala Comercial",
  lote = "Lote",
  chacara = "Chácara",
  sitio = "Sítio",
  fazenda = "Fazenda",
}

export interface IImovel {
  codigo: string;
  tipo: tiposImovel;
  descricao: string;
  nomeDoVendedor: string;
  precoSolicitado: number;
  imagem: string;
  dataDeCadastro: Date;
  vendido: boolean;
}
