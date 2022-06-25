/* eslint-disable prettier/prettier */
import sinon from "sinon";

import expect from 'expect';
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import AddZapatoTask, { addZapatoInf } from "../../../src/Service-layer/tasks/AddZapatoTask";
import Zapato from "../../../src/domain-layer/Zapato";

describe('AddZapatoTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const zapatoData: addZapatoInf = {
    marca: 'marca1',
    talla: 1,
    color: 'blanco',
  };
  // tal vez aqui valio

  const expectedZapato = new Zapato(
    "1",
    zapatoData.marca,
    zapatoData.talla,
    zapatoData.color
  );

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should add a shoe to the database', async () => {
    databaseConnectionMock.withSaveReturningEntity(expectedZapato);

    const task = new AddZapatoTask(zapatoData);
    const zapato = await task.execute();

    expect(zapato).toEqual(expectedZapato);
    databaseConnectionMock.expectGotRepositoryOf(Zapato);
    databaseConnectionMock.expectSaveCalledOnceWith(zapatoData);
  });
});