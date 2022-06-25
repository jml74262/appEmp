/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import AddZapatoTask, { addZapatoInf } from "../tasks/AddZapatoTask";
import DeleteZapatoTask from "../tasks/DeleteZapatoTask";
import FindZapatoTask from "../tasks/FindZapatoTask";
import GetZapatoListTask from "../tasks/GetZapatoListTask";
import UpdateZapatoTask, { UpdateZapatoData } from "../tasks/UpdateZapatoTask";
import BaseController from "./BaseControllers";

export default class ZapatosController extends BaseController {
  public constructor() {
    super("/Zapatos");
  }

  protected configureRouter(): void {
    this.router.get('/', this.getZapatoList.bind(this));
    this.router.get('/:id', this.findZapato.bind(this));
    this.router.post('/', this.addZapato.bind(this));
    this.router.put('/', this.updateZapato.bind(this));
    this.router.delete('/:id', this.deleteZapato.bind(this));
  }

  private async getZapatoList(req: Request, res: Response): Promise<void> {
    try {
      const getZapatoList = new GetZapatoListTask();

      const zapatoList = await getZapatoList.execute();

      this.respond(res, 200, zapatoList);
    } catch {
      this.respond(res, 500);
    }
  }

  private async findZapato(req: Request, res: Response): Promise<void> {
    try {
      const zapId = req.params.id;
      const getZapatoListTask = new FindZapatoTask(zapId);

      const zap = await getZapatoListTask.execute();// Como delvuelve una promesa de Car, utilizamos el await

      this.respond(res, 200, zap)
    } catch (e) {
      if ((<Error>e).message === 'Zapato no encontrado.') {
        this.respond(res, 404);
      } else {
        this.respond(res, 500);
      }
    }
  }

  private async addZapato(req: Request, res: Response): Promise<void> {
    try {
      const zapData = <addZapatoInf>req.body; // UpdateCarData lo usamos para dar los parametros que requerimos

      const addZapTask = new AddZapatoTask(zapData);

      const zap = await addZapTask.execute();

      this.respond(res, 200, zap);
    } catch {
      this.respond(res, 500);
    }
  }

  private async updateZapato(req: Request, res: Response): Promise<void> {
    try {
      const zapData= <UpdateZapatoData>req.body;

      const updateZapatoTask = new UpdateZapatoTask(zapData);

      const updatedZapato = await updateZapatoTask.execute();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedZapato));

      this.respond(res, 200, updatedZapato);
    } catch (e) {
      if ((<Error>e).message === "Zapato no encontrado.") {
        this.respond(res, 404);
      } else {
        this.respond(res, 500);
      }
    }
  }

  private async deleteZapato(req: Request, res: Response): Promise<void> {
    try {
      const zapId = req.params.id;
      const deleteZapatoTask = new DeleteZapatoTask(zapId);

      await deleteZapatoTask.execute();

      this.respond(res, 200);
    } catch (e){
      this.respond(res, 500);
    }
  }
}