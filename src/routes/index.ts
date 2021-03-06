import ImovelRouter from "./Imovel";
import ImageRouter from "./Image";
import CorretorRouter from "./Corretor";
import VendaRouter from "./Venda";
import SalarioRouter from "./Salario";
import RelatorioRouter from "./Relatorio";

import { Express } from "express";
import { IEntityRouter, IMainRouter } from "./interfaces";

export class MainRouter implements IMainRouter {
  routers: IEntityRouter[];

  constructor(express: Express) {
    this.routers = [];
    this.routers.push(new ImovelRouter());
    this.routers.push(new ImageRouter());
    this.routers.push(new CorretorRouter());
    this.routers.push(new VendaRouter());
    this.routers.push(new SalarioRouter());
    this.routers.push(new RelatorioRouter());
    this.routers.forEach((router) => {
      express.use(router.uri, router.router);
    });
  }
}
