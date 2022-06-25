/* eslint-disable prettier/prettier */
import Zapato from "../../domain-layer/Zapato";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import IAsyncTaks from "./IAsyncTask";

export default class FindZapatoTask implements IAsyncTaks<Zapato> {
  private zapatoId: string;

  public constructor(zId: string) {
    this.zapatoId = zId;
  }

  public async execute(): Promise<Zapato> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const destinyRep = databaseConnection.getRepo(Zapato);

    const zapato = await destinyRep.findOneBy({id:this.zapatoId});

    if(!zapato) {
      throw new Error('Zapato no encontrado.');
    }
    
    return zapato;
  }
}