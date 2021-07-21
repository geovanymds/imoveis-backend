import { ImageModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { IController, IImageController } from "./interfaces";
import HttpException from "../helpers/httpException";

export default class ImageController implements IController, IImageController {
  async salvar(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { originalname, filename, size } = <Express.Multer.File>req.file;
    try {
      const url = `${process.env.APP_URL}/public/images/${filename}`;
      const image = await ImageModel.create({
        nome: originalname,
        url,
        nomeCompleto: filename,
        tamanho: size,
      });

      return res.status(200).json({
        message: "Imagem salva com sucesso.",
        image,
      });
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async deletar(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;

    try {
      const image = await ImageModel.findById(id);
      if (!image) {
        throw new HttpException(404, "Imagem não encontrada.");
      }
      await image.remove();
    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}
