/* eslint-disable prettier/prettier */
import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import expect from "expect";
import InventoryIns from "../../../../src/domain-layer/InventoryIns";
import { AddInventoryInsData } from "../../../../src/Service-layer/tasks/AddInventoryIn";
import * as addInventoryInsModule from "../../../../src/Service-layer/tasks/AddInventoryIn";

export default class AddCarTaskMock {
    private readonly instanceStub: SinonStubbedInstance<addInventoryInsModule.default>;

    private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(addInventoryInsModule.default);
    this.constructorStub = sandbox.stub(addInventoryInsModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(sales: InventoryIns): void {
    this.instanceStub.execute.returns(Promise.resolve(sales));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnceWithCarData(salesData: AddInventoryInsData): void {
    expect(this.constructorStub.calledOnce).toBe(true);
    const call = this.constructorStub.getCall(0);
    expect(call.args[0]).toEqual(salesData);
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}