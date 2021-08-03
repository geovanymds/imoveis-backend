import { Request, Response, NextFunction } from "express";

export interface IController {}

export interface IImovelController {
  cadastrar(req: Request, res: Response, next: NextFunction): Promise<any>;
  listar(req: Request, res: Response, next: NextFunction): Promise<any>;
  alterar(req: Request, res: Response, next: NextFunction): Promise<any>;
  deletar(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface IImageController {
  salvar(req: Request, res: Response, next: NextFunction): Promise<any>;
  deletar(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface ICorretorController {
  cadastrar(req: Request, res: Response, next: NextFunction): Promise<any>;
  listar(req: Request, res: Response, next: NextFunction): Promise<any>;
  alterar(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface IVendaController {
  cadastrar(req: Request, res: Response, next: NextFunction): Promise<any>;
  listar(req: Request, res: Response, next: NextFunction): Promise<any>;
  alterar(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface ISalarioController {
  getSalario(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface IRelatorioController {
  getRelatorio(req: Request, res: Response, next: NextFunction): Promise<any>;
}
