import { Corretor, CorretorModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, ICorretorController } from "./interfaces";
import HttpException from "../helpers/httpException";

export default class CorretorController
  implements IController, ICorretorController
{
  async cadastrar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { tipo, nome, creci, salario, dataAdmissao, comissao } = req.body;

    try {
      const newCorretor = new Corretor({
        tipo,
        nome,
        creci,
        salario,
        dataAdmissao,
        comissao,
      });

      await CorretorModel.create(newCorretor);

      return res.status(200).json({
        message: "Corretor cadastrado com sucesso.",
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async alterar(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { tipo, salario, comissao } = req.body;
    try {
      if (!id || typeof id != "string") {
        throw new HttpException(400, "Parâmetros inválidos.");
      }
      const corretor = await CorretorModel.findById(id);
      if (!corretor) {
        throw new HttpException(404, "Corretor não encontrado.");
      }
      corretor.tipo = !!tipo ? tipo : corretor.tipo;
      corretor.salario = !!salario ? salario : corretor.salario;
      corretor.comissao = !!comissao ? comissao : corretor.comissao;
      const corretorSalvo = await corretor.save();
      return res.status(200).json({
        corretorSalvo,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async listar(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { tipo } = req.query;
    try {
      if (!tipo || tipo == "todos") {
        const corretores = await CorretorModel.find();
        return res.status(200).json({
          corretores,
        });
      } else {
        const corretores = await CorretorModel.find()
          .where("tipo")
          .equals(tipo);
        return res.status(200).json({
          corretores,
        });
      }
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}
