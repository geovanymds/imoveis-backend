import { Request, Response, NextFunction } from "express";

export interface IController {}

export interface IImovelController {
  cadastrar(req: Request, res: Response, next: NextFunction): Promise<any>;
}
