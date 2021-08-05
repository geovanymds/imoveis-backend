import { Request, Response, NextFunction } from "express";
import { IController, IRelatorioController } from "./interfaces";
import HttpException from "../helpers/httpException";
import { CorretorModel, ImovelModel, VendaModel } from "../models";
import endOfMonth from "date-fns/endOfMonth";
import { subMonths } from "date-fns";

export default class RelatorioController
  implements IController, IRelatorioController
{
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
          $lte: endMonth,
        },
      });
      let relatorio = {} as any;

      relatorio.faturamentoTotal = await faturamentoImobiliaria(vendas);
      relatorio.lucro = await lucroImobiliaria(
        relatorio.faturamentoTotal,
        vendas
      );
      relatorio.imoveisVendidos = await imoveisVendidos(vendas);
      relatorio.imoveisEncalhados = await imoveisEncalhados(mes, ano);
      relatorio.faturamentoCorretor = await faturamentoCorretor(vendas);
      relatorio.pagamentoCorretor = await pagamentoCorretor(vendas);
      relatorio.corretorMes = await corretorMes(vendas);

      return res.status(200).json({
        message: "Relatorio gerado com sucesso.",
        relatorio,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}

export async function faturamentoImobiliaria(vendas: any): Promise<number> {
  let soma = 0.0;
  vendas.forEach((venda: any) => {
    soma += venda.valor * 0.05;
  });
  soma = Math.round((soma + Number.EPSILON) * 100) / 100;
  return soma;
}

export async function lucroImobiliaria(
  faturamento: number,
  vendas: any
): Promise<number> {
  let soma = 0.0;
  await Promise.all(
    vendas.map(async (venda: any) => {
      let corretor = await CorretorModel.findOne({
        creci: venda.creciCorretor,
      });
      if (corretor) {
        soma += venda.valor * (corretor.comissao / 100);
      }
      return corretor;
    })
  );
  let lucro = faturamento - soma;
  lucro = Math.round((lucro + Number.EPSILON) * 100) / 100;
  return lucro;
}

export async function imoveisVendidos(vendas: any): Promise<any> {
  let codigoImoveis = [] as any;
  const promises = vendas.map(async (venda: any) => {
    codigoImoveis.push(venda.codigoImovel);
  });  
  await Promise.all(promises);
  let imoveis = await ImovelModel.find({ vendido: true, codigo:{ $in: codigoImoveis} });
  return imoveis;
}

export async function imoveisEncalhados(
  mes: number,
  ano: number
): Promise<any> {
  let dataLimite = subMonths(new Date(ano, mes - 1, 1), 6);
  let imoveisEncalhados = await ImovelModel.find({
    vendido: false,
    dataDeCadastro: {
      $lte: dataLimite,
    },
  });
  return imoveisEncalhados;
}

export async function faturamentoCorretor(vendas: any): Promise<any> {
  let corretores = {} as any;

  vendas.forEach(async (venda: any) => {
    if (corretores[venda.creciCorretor]) {
      corretores[venda.creciCorretor] += venda.valor * 0.05;
    } else {
      corretores[venda.creciCorretor] = venda.valor * 0.05;
    }
  });
  let crecis = Object.keys(vendas);
  let response = [] as any;
  await Promise.all(
    crecis.map(async (creci: any) => {
      response.push({creci, valor: corretores[creci] })
    })    
  );
  return response;
}

export async function pagamentoCorretor(vendas: any): Promise<any> {
  let corretores = {} as any;

  let corretoresCollection = await CorretorModel.find()
    .where("tipo")
    .equals("Contratado");
  await Promise.all(
    corretoresCollection.map(async (corretor: any) => {
      corretores[corretor.creci] = corretor.salario;
    })
  );
  await Promise.all(
    vendas.map(async (venda: any) => {
      let corretor = await CorretorModel.findOne({
        creci: venda.creciCorretor,
      });
      if (corretores[venda.creciCorretor] && corretor) {
        corretores[venda.creciCorretor] +=
          venda.valor * (corretor.comissao / 100);
      } else if (corretor) {
        corretores[venda.creciCorretor] =
          venda.valor * (corretor.comissao / 100);
      }
    })    
  );
  let crecis = Object.keys(corretores);
  let response = [] as any;
  await Promise.all(
    crecis.map(async (creci: any) => {
      response.push({creci, valor: corretores[creci] })
    })    
  );
  return response;
}

export async function corretorMes(vendas: any): Promise<any> {
  let corretorMes = { codigo: "", valor: 0 };
  let corretores = {} as any;

  const promises = vendas.map(async (venda: any) => {
    let corretor = await CorretorModel.findOne({ creci: venda.creciCorretor });

    if (corretores[venda.creciCorretor] && corretor) {
      corretores[venda.creciCorretor] +=
        venda.valor * (corretor.comissao / 100);
    } else if (corretor) {
      corretores[venda.creciCorretor] = venda.valor * (corretor.comissao / 100);
    }
    if (corretores[venda.creciCorretor] > corretorMes.valor) {
      corretorMes.codigo = venda.creciCorretor;
      corretorMes.valor = corretores[venda.creciCorretor];
    }
  });
  corretorMes.valor =
    Math.round((corretorMes.valor + Number.EPSILON) * 100) / 100;
  await Promise.all(promises);

  return corretorMes;
}
