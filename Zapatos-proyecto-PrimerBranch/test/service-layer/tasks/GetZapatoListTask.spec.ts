/* eslint-disable prettier/prettier */
import sinon from "sinon";
import expect from "expect";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Zapato from "../../../src/domain-layer/Zapato";
import GetZapatoListTask from "../../../src/Service-layer/tasks/GetZapatoListTask";

describe('GetZapatoListTask tests', () => {
    let sandbox: sinon.SinonSandbox;
    let databaseConnectionMock: DatabaseConnectionMock;
  
    const expectedZapatosList: Zapato[] = [
      new Zapato("1", 'brand1', 1, 'color1'),
      new Zapato("2", 'brand2', 2, 'color2'),
      new Zapato("3", 'brand3', 3, 'color3'),
    ];
  
    before(() => {
      sandbox = sinon.createSandbox();
    });
  
    beforeEach(() => {
      databaseConnectionMock = new DatabaseConnectionMock(sandbox);
    })
  
    afterEach(() => {
      sandbox.restore();
    });
  
    it('should return a list of shoes', async () => {
      databaseConnectionMock.withFindReturningListOfEntities(expectedZapatosList);
  
      const task = new GetZapatoListTask();
      const carsList = await task.execute();
  
      expect(carsList).toEqual(expectedZapatosList);
      databaseConnectionMock.expectGotRepositoryOf(Zapato);
      databaseConnectionMock.expectFindCalledOnce();
    });
  });
  