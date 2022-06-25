/* eslint-disable prettier/prettier */
import Zapato from "../../domain-layer/Zapato";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindZapatoTask from "./FindZapatoTask";
import IAsyncTaks from "./IAsyncTask";

export type UpdateZapatoData = {
  id: string;
  marca: string;
  talla: number;
  color: string;
}

export default class UpdateZapatoTask implements IAsyncTaks<Zapato> {
  private updateZapatoData: UpdateZapatoData;

  public constructor(zapData: UpdateZapatoData) {
    this.updateZapatoData = zapData;
  }

  public async execute(): Promise<Zapato> {
    const findZapatoTask = new FindZapatoTask(this.updateZapatoData.id);

    const zap = await findZapatoTask.execute();

    zap.color = this.updateZapatoData.color;
    zap.marca = this.updateZapatoData.marca;
    zap.talla = this.updateZapatoData.talla;

    const databaseConnection = await DatabaseConnection.getInstance();
    const zapRepo = databaseConnection.getRepo(Zapato);

    zapRepo.save(zap);

    return zap;
  }
}
