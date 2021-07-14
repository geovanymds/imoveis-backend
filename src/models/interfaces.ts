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
