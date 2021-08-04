import { Imovel, ImovelModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, IImovelController } from "./interfaces";
import HttpException from "../helpers/httpException";

export default class ImovelController
  implements IController, IImovelController {
  async cadastrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const {
      codigo,
      tipo,
      descricao,
      proprietarioDoImovel,
      precoSolicitado,
      imagem,
      dataDeCadastro,
    } = req.body;

    try {
      const newImovel = new Imovel({
        codigo,
        tipo,
        descricao,
        proprietarioDoImovel,
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
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
    let { tipos, local } = req.query;

    try {
      if (!tipos || typeof tipos != "string") {
        throw new HttpException(400, "Parâmetros inválidos.");
      }
      if (tipos == 'todos') {
        tipos = '["Casa","Apartamento","Sala Comercial","Lote","Chacara","Sitio","Fazenda"]'
      }
      if (local == 'urbano' && Array.isArray(tipos)) {
        tipos = '["Casa", "Apartamento", "Sala Comercial", "Lote"]'
      }
      else if (local == 'rural' && Array.isArray(tipos)) {
        tipos = '["Chacara", "Sitio", "Fazenda"]'
      }

      const imoveis = await ImovelModel.find()
        .where("tipo").in(JSON.parse(tipos))
        .where("vendido").equals(false);
      return res.status(200).json({
        imoveis,
      });

    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async alterar(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { descricao, proprietarioDoImovel, precoSolicitado, imagem } =
      req.body;
    try {
      if (!id || typeof id != "string") {
        throw new HttpException(400, "Parâmetros inválidos.");
      }
      const imovel = await ImovelModel.findById(id);
      if (!imovel) {
        throw new HttpException(404, "Imovel não encontrado.");
      }
      imovel.imagem = !!imagem ? imagem : imovel.imagem;
      imovel.descricao = descricao;
      imovel.proprietarioDoImovel = proprietarioDoImovel;
      imovel.precoSolicitado = precoSolicitado;
      const imovelSalvo = await imovel.save();
      return res.status(200).json({
        imovelSalvo,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { codigo } = req.params;
    try {
      if (!codigo) {
        throw new HttpException(400, "Parâmetros inválidos.");
      }
      await ImovelModel.deleteOne().where("codigo").equals(codigo);

      return res.status(200).json({
        message: "Imovel deletados com sucesso"
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
  async deletarLista(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { codigos } = req.body;
    try {
      if (!codigos) {
        throw new HttpException(400, "Parâmetros inválidos.");
      }
      await ImovelModel.deleteMany().where("codigo").in(codigos);

      return res.status(200).json({
        message: "Imoveis deletados com sucesso"
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}
