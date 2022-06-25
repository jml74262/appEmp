/* eslint-disable prettier/prettier */
import sinon from "sinon";
import expect from "expect";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Zapato from "../../../src/domain-layer/Zapato";
import FindZapatoTask from "../../../src/Service-layer/tasks/FindZapatoTask";

describe('FindZapatoTask tests', () => {
    let sandbox: sinon.SinonSandbox;
    let databaseConnectionMock: DatabaseConnectionMock;
  
    const zapatoId = "1";
    const expectedZapato = new Zapato(zapatoId, 'brand1', 1, 'blanco');
  
    before(() => {
      sandbox = sinon.createSandbox();
    });
  
    beforeEach(() => {
      databaseConnectionMock = new DatabaseConnectionMock(sandbox);
    })
  
    afterEach(() => {
      sandbox.restore();
    });
  
    it('should find a car', async () => {
      databaseConnectionMock.withFindOneByReturningEntity(expectedZapato);
  
      const task = new FindZapatoTask(zapatoId);
      const car = await task.execute();
  
      expect(car).toEqual(expectedZapato);
      databaseConnectionMock.expectGotRepositoryOf(Zapato);
      databaseConnectionMock.expectFindOneByCalledOnceWith({ id: zapatoId });
    });
  
    it('should throw "Zapato no encontrado." if car doesn\'t exist', async () => {
      databaseConnectionMock.withFindOneByReturningEntity(null);
  
      const task = new FindZapatoTask(zapatoId);
      await expect(task.execute()).rejects.toThrow('Zapato no encontrado');
  
      databaseConnectionMock.expectGotRepositoryOf(Zapato);
      databaseConnectionMock.expectFindOneByCalledOnceWith({ id: zapatoId });
    });
  });
  