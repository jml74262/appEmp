/* eslint-disable prettier/prettier */
import sinon from "sinon";
import expect from "expect";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Zapato from "../../../src/domain-layer/Zapato";
import UpdateZapatoTask, { UpdateZapatoData } from "../../../src/Service-layer/tasks/UpdateZapatoTask";
import FindZapatoTaskMock from "../controllers/test-doubles/FindZapatoTaskMock";

describe('UpdateZapatoTask tests', () => {
    let sandbox: sinon.SinonSandbox;
    let databaseConnectionMock: DatabaseConnectionMock;
    let findZapatoTaskMock: FindZapatoTaskMock;
  
    const zapatoData: UpdateZapatoData = { id: "1", marca: "Marca1", talla: 1, color: "Color1"};
    const expectedZapato = new Zapato(zapatoData.id, zapatoData.marca, zapatoData.talla, zapatoData.color);
  
    before(() => {
      sandbox = sinon.createSandbox();
    });
  
    beforeEach(() => {
      databaseConnectionMock = new DatabaseConnectionMock(sandbox);
      findZapatoTaskMock = new FindZapatoTaskMock(sandbox);
    })
  
    afterEach(() => {
      sandbox.restore();
    });
  
    it('should update a shoe', async () => {
      findZapatoTaskMock.withExecuteReturning(expectedZapato);
      databaseConnectionMock.withSaveReturningEntity(expectedZapato);
  
      const task = new UpdateZapatoTask(zapatoData);
      const zapato = await task.execute();
  
      expect(zapato).toEqual(expectedZapato);
    })
  });
  