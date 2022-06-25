/* eslint-disable prettier/prettier */
import Zapato from "../../domain-layer/Zapato";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import IAsyncTaks from "./IAsyncTask";

export default class GetZapatoListTask implements IAsyncTaks<Zapato[]> {
  public async execute(): Promise<Zapato[]> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const zapRepo = databaseConnection.getRepo(Zapato);
    return zapRepo.find(); // Find para listar todos los elementos
  }
}