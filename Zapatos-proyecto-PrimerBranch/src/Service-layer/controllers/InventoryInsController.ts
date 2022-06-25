/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import BaseController from "./BaseControllers";
import AddInventoryIns, { AddInventoryInsData} from "../tasks/AddInventoryIn";

export default class InventoryInsController extends BaseController{
  public constructor(){
    super("/inventory-ins");
  }

  protected configureRouter(): void {
    this.router.post("/", this.addInventoryIns.bind(this))
  }

  private async addInventoryIns(req: Request, res: Response): Promise<void> {
    try {
      const addZapatoInf = <AddInventoryInsData>req.body;

      const addInventoryInsTask = new AddInventoryIns(addZapatoInf);
      const inventoryIns = await addInventoryInsTask.execute();

      this.respond(res, 200, inventoryIns);
    } catch(e) {
      if((<Error>e).message === "Zapato no encontrado pai") {
        this.respond(res, 404)
      }else {
        this.respond(res, 500);
      }
    }
  }
}