/* eslint-disable prettier/prettier */
import IAsyncTaks from "./IAsyncTask";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import Zapato from "../../domain-layer/Zapato";

export default class DeleteZapatoTask implements IAsyncTaks<void> {
  private zapId: string;

  public constructor(zapId: string) {
    this.zapId = zapId;
  }

  public async execute(): Promise<void> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const zapRepo = databaseConnection.getRepo(Zapato);
    
    await zapRepo.delete(this.zapId);
  }

  public async executeFind(): Promise<Zapato> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const zapRepo = databaseConnection.getRepo(Zapato);

    const zapato = await zapRepo.findOneBy({ id : this.zapId });
    
    if (!zapato) {
      throw new Error('No more zapatos to delete in the database.');
    }

    return zapato;

  }
}