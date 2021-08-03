import { Venda, VendaModel, ImovelModel, CorretorModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, IVendaController } from "./interfaces";
import HttpException from "../helpers/httpException";

export default class VendaController implements IController, IVendaController {
  async cadastrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { codigoImovel, idCorretor, dataVenda, valor, nomeComprador } =
      req.body;

    try {
      const newVenda = new Venda({
        codigoImovel,
        nomeCorretor,
        dataVenda,
        valor,
        nomeComprador,
      });

      const corretor = await CorretorModel.findOne({ creci: nomeCorretor });

      if (!corretor) {
        throw new HttpException(403, "Corretor não cadastrado.");
      }

      const imovel = await ImovelModel.find()
        .where("codigo")
        .equals(codigoImovel);
      if (imovel.length > 0 && !imovel[0].vendido) {
        await VendaModel.create(newVenda);
        imovel[0].vendido = true;
        await imovel[0].save();
      } else {
        throw new HttpException(404, "Imovel não encontrado.");
      }

      return res.status(200).json({
        message: "Venda cadastrada com sucesso.",
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async alterar(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { codigoImovel, idCorretor, dataVenda, valor, nomeComprador } =
      req.body;
    try {
      if (!id || typeof id != "string") {
        throw new HttpException(400, "Parâmetros inválidos.");
      }
      const venda = await VendaModel.findById(id);
      if (!venda) {
        throw new HttpException(404, "Venda não encontrado.");
      }
      venda.codigoImovel = !!codigoImovel ? codigoImovel : venda.codigoImovel;
      venda.idCorretor = !!idCorretor ? idCorretor : venda.idCorretor;
      venda.dataVenda = !!dataVenda ? dataVenda : venda.dataVenda;
      venda.valor = !!valor ? valor : venda.valor;
      venda.nomeComprador = !!nomeComprador
        ? nomeComprador
        : venda.nomeComprador;
      const vendaSalvo = await venda.save();
      return res.status(200).json({
        vendaSalvo,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const vendas = await VendaModel.find();
      return res.status(200).json({
        vendas,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}
