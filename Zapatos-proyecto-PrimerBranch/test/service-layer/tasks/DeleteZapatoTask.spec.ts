/* eslint-disable prettier/prettier */
import sinon from "sinon";
import expect from "expect";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import DeleteZapatoTask from "../../../src/Service-layer/tasks/DeleteZapatoTask";
import Zapato from "../../../src/domain-layer/Zapato";

describe('DeleteZapatoTask tests', () => {
    let sandbox: sinon.SinonSandbox;
    let databaseConnectionMock: DatabaseConnectionMock;
  
    const zapatoId = "1";
  
    before(() => {
      sandbox = sinon.createSandbox();
    });
  
    beforeEach(() => {
      databaseConnectionMock = new DatabaseConnectionMock(sandbox);
    })
  
    afterEach(() => {
      sandbox.restore();
    });
  
    it('should delete a zapato', async () => {
      databaseConnectionMock.withDeleteSucceeding();
  
      const task = new DeleteZapatoTask(zapatoId);
      await task.execute();
  
      databaseConnectionMock.expectGotRepositoryOf(Zapato);
      databaseConnectionMock.expectDeleteCalledOnceWith(zapatoId);
    });
    it('should throw "No more zapatos to delete in the database." if there\'s no more zapatos', async () => {
      databaseConnectionMock.withFindOneByReturningEntity(null);
  
      const task = new DeleteZapatoTask(zapatoId);
      await expect(task.executeFind()).rejects.toThrow('No more zapatos to delete in the database.');
  
      databaseConnectionMock.expectGotRepositoryOf(Zapato);
      databaseConnectionMock.expectFindOneByCalledOnceWith({ id: zapatoId });
    });
  });
  