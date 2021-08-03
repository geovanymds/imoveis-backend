
import { Request, Response, NextFunction } from "express";
import { IController, IRelatorioController } from "./interfaces";
import HttpException from "../helpers/httpException";
import { CorretorModel, ImovelModel, VendaModel } from "../models";
import endOfMonth from 'date-fns/endOfMonth';
import { subMonths } from "date-fns";

export default class RelatorioController
  implements IController, IRelatorioController {
  async getRelatorio(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { mes, ano } = req.body;
    const startMonth = new Date(ano, mes - 1, 1);
    const endMonth = endOfMonth(startMonth);
    try {
      let vendas = await VendaModel.find({
        dataVenda: {
          $gte: startMonth,
          $lte: endMonth
        }
      })
      let relatorio = {} as any;

      relatorio.faturamentoTotal = await faturamentoImobiliaria(vendas);
      relatorio.lucro = await lucroImobiliaria(relatorio.faturamentoTotal, vendas);
      relatorio.imoveisVendidos = await imoveisVendidos();
      relatorio.imoveisEncalhados = await imoveisEncalhados();
      relatorio.faturamentoCorretor = await faturamentoCorretor(vendas);
      relatorio.pagamentoCorretor = await pagamentoCorretor(vendas);
      relatorio.corretorMes = await corretorMes(vendas);
      

      return res.status(200).json({
        message: "Relatorio gerado com sucesso.",
        relatorio
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}

export async function faturamentoImobiliaria(
  vendas: any
): Promise<number> {
  let soma = 0.0;
  vendas.forEach((venda: any) => {    
    soma += venda.valor * 0.05;
  })
  soma = Math.round((soma + Number.EPSILON) * 100) / 100;
  return soma;
}

export async function lucroImobiliaria(
  faturamento: number,
  vendas: any,
): Promise<number> {
  let soma = 0.0;

  vendas.forEach(async (venda: any) => {
    let corretor = await CorretorModel.findById(venda.idCorretor);
    if (corretor) {
      soma += venda.valor * (corretor.comissao / 100);
    }
  })
  let lucro = faturamento - soma;
  lucro = Math.round((lucro + Number.EPSILON) * 100) / 100;
  return lucro;
}

export async function imoveisVendidos(
): Promise<any> {
  let imoveis = await ImovelModel.find({ vendido: true });
  return imoveis;
}

export async function imoveisEncalhados(
): Promise<any> {
  let dataLimite = subMonths(new Date(), 6)
  let imoveisEncalhados = await ImovelModel.find({
    vendido: false, dataDeCadastro: {
      $lte: dataLimite,
    }
  });
  return imoveisEncalhados;
}

export async function faturamentoCorretor(
  vendas: any
): Promise<any> {
  let corretores = {} as any;

  vendas.forEach(async (venda: any) => {
    if (corretores[venda.idCorretor]) {
      corretores[venda.idCorretor] += venda.valor * 0.05;
    }
    else {
      corretores[venda.idCorretor] = venda.valor * 0.05;
    }
  })  
  return corretores;
}


export async function pagamentoCorretor(
  vendas: any
): Promise<any> {
  let corretores = {} as any;
  vendas.forEach(async (venda: any) => {
    let corretor = await CorretorModel.findById(venda.idCorretor);
    if (corretores[venda.idCorretor] && corretor) {
      corretores[venda.idCorretor] += venda.valor * (corretor.comissao / 100);
    }
    else if (corretor) {
      corretores[venda.idCorretor] = venda.valor * (corretor.comissao / 100);
    }
  })
  return corretores;
}

export async function corretorMes(
  vendas: any
): Promise<any> {
  let corretorMes = { codigo: "", valor: 0 };
  let corretores = {} as any;
  
  const promises = vendas.map(async (venda: any) => {
    let corretor = await CorretorModel.findById(venda.idCorretor);
    
    if (vendas[venda.idCorretor] && corretor) {
      corretores[venda.idCorretor] += venda.valor * (corretor.comissao / 100);
    }
    else if (corretor) {
            corretores[venda.idCorretor] = venda.valor * (corretor.comissao / 100);
    }
    if (corretores[venda.idCorretor] > corretorMes.valor) {
      corretorMes.codigo = venda.idCorretor;
      corretorMes.valor = corretores[venda.idCorretor];
    };
  })
  corretorMes.valor = Math.round((corretorMes.valor + Number.EPSILON) * 100) / 100;
  await Promise.all(promises);
  
  return corretorMes;
}
