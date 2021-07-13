import { Imovel, ImovelModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, IImovelController } from "./interfaces";

export default class ImovelController
  implements IController, IImovelController
{
  async cadastrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const {
      codigo,
      tipo,
      descricao,
      nomeDoVendedor,
      precoSolicitado,
      imagem,
      dataDeCadastro,
    } = req.body;

    try {
      const newImovel = new Imovel({
        codigo,
        tipo,
        descricao,
        nomeDoVendedor,
        precoSolicitado,
        imagem,
        dataDeCadastro,
        vendido: false,
      });

      await ImovelModel.create(newImovel);

      return res.status(200).json({
        message: "Imóvel cadastrado com sucesso.",
      });
    } catch (error) {
      next(new Error(error || "ERRO GENÉRICO"));
    }
  }
}
