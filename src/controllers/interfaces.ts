import { Request, Response, NextFunction } from "express";

export interface IController {}

export interface IImovelController {
  cadastrar(req: Request, res: Response, next: NextFunction): Promise<any>;
  listar(req: Request, res: Response, next: NextFunction): Promise<any>;
  alterar(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface IImageController {
  salvar(req: Request, res: Response, next: NextFunction): Promise<any>;
  deletar(req: Request, res: Response, next: NextFunction): Promise<any>;
}
