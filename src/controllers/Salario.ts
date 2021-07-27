import { CorretorModel, VendaModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, ISalarioController } from "./interfaces";
import HttpException from "../helpers/httpException";
import endOfMonth from 'date-fns/endOfMonth'

export default class SalarioController
    implements IController, ISalarioController {
    async getSalario(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        const { month, year, idCorretor } = req.body;
        const startMonth = new Date(year, month - 1, 1);
        const endMonth = endOfMonth(startMonth);
        try {
            let vendas = await VendaModel.find({
                dataVenda: {
                    $gte: startMonth,
                    $lte: endMonth
                }
            }).where("idCorretor")
                .equals(idCorretor);
            let corretor = await CorretorModel.findById(idCorretor)
            let response = await this.calculoSalario(vendas, corretor);
            return res.status(200).json(response);

        } catch (error) {
            next(new HttpException(error.status || 500, error.message));
        }
    }


    async calculoSalario(
        vendas: any, corretor: any
    ): Promise<any> {
        let soma = 0.0;
        if (corretor && corretor.tipo == "Comissionado") {
            vendas.forEach((venda: any) => {
                soma += venda.valor * corretor.comissao;
            })
            return {
                message: "Salário calculado com sucesso.",
                comissao: soma

            };
        }
        else if (corretor && corretor.tipo == "Contratatado") {
            vendas.forEach((venda: any) => {
                soma += venda.valor * (corretor.comissao / 100);
            })
            return {
                message: "Salário calculado com sucesso.",
                comissao: soma,
                salario: corretor.salario,
                total: soma + corretor.salario
            };
        }

    }

}
