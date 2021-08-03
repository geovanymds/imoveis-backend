import { CorretorModel, VendaModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, ISalarioController } from "./interfaces";
import HttpException from "../helpers/httpException";
import endOfMonth from "date-fns/endOfMonth";

export default class SalarioController
  implements IController, ISalarioController
{
  async getSalario(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { mes, ano, idCorretor } = req.body;

    const formatedStartMonth = ano+"-"+mes+"-"+"1";
    const startMonth = new Date(formatedStartMonth);
    const endMonth = endOfMonth(startMonth);
    try {
      let vendas = await VendaModel.find({
        dataVenda: {
          $gte: startMonth,
          $lte: endMonth,
        },
      })
        .where("idCorretor")
        .equals(idCorretor);
      let corretor = await CorretorModel.findById(idCorretor);
      let response = calculoSalario(vendas, corretor);
      return res.status(200).json(response);
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}

export function calculoSalario(vendas: any, corretor: any): any {
  let soma = 0.0;
  if (corretor && corretor.tipo == "Comissionado") {
    vendas.forEach((venda: any) => {
      soma += venda.valor * (corretor.comissao / 100);
    });
    return {
      message: "Salário calculado com sucesso.",
      comissao: soma,
    };
  } else if (corretor && corretor.tipo == "Contratado") {
    vendas.forEach((venda: any) => {
      soma += venda.valor * (corretor.comissao / 100);
    });
    return {
      message: "Salário calculado com sucesso.",
      comissao: soma,
      salario: corretor.salario,
      total: soma + corretor.salario,
    };
  }
}
