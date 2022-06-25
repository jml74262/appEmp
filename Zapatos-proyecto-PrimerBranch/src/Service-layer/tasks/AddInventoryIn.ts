/* eslint-disable prettier/prettier */
import InventoryIns from "../../domain-layer/InventoryIns";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindZapatoTask from "./FindZapatoTask";
import IAsyncTaks from "./IAsyncTask";

export type AddInventoryInsData = {
  zapatoID: string;
  quantity: number;
}

export default class AddInventoryIns implements IAsyncTaks<InventoryIns> {
  private addInventoryInsData: AddInventoryInsData;

  public constructor(addInventoryInsData: AddInventoryInsData) {
    this.addInventoryInsData = addInventoryInsData;
  }

  public async execute(): Promise<InventoryIns> {
    const { zapatoID, quantity } = this.addInventoryInsData

    const findZapatoTask = new FindZapatoTask(zapatoID);
    const zap = await findZapatoTask.execute();

    const databaseConnection = await DatabaseConnection.getInstance();
    const InventoryInsRepo = databaseConnection.getRepo(InventoryIns);

    const inventoryIns = await InventoryInsRepo.save({ zap, quantity, date: new Date()});

    return inventoryIns;
  }
}