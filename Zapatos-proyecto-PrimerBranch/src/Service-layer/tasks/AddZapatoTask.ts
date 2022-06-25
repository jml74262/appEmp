import Zapato from '../../domain-layer/Zapato';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTaks from './IAsyncTask';

export type addZapatoInf = {
  marca: string;
  talla: number;
  color: string;
};

export default class AddZapatoTask implements IAsyncTaks<Zapato> {
  private addZapatoInf: addZapatoInf;

  public constructor(addZapatoData: addZapatoInf) {
    this.addZapatoInf = addZapatoData;
  }

  public async execute(): Promise<Zapato> {
    const dbConnection = await DatabaseConnection.getInstance();
    const zapRepo = dbConnection.getRepo(Zapato);

    const zapato = zapRepo.save(this.addZapatoInf);

    return zapato;
  }
}
