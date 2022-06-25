/* eslint-disable prettier/prettier */
import { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import  expect  from "expect";
import * as deleteZapatoTaskModule from "../../../../src/Service-layer/tasks/DeleteZapatoTask"

export default class DeleteZapatoTaskMock {
    private readonly instanceStub: SinonStubbedInstance<deleteZapatoTaskModule.default>;

    private readonly constructorStub: SinonStub;

    public constructor(sandbox: SinonSandbox) {
        this.instanceStub = sandbox.createStubInstance(deleteZapatoTaskModule.default);
        this.constructorStub = sandbox.stub(deleteZapatoTaskModule, "default");
        this.constructorStub.returns(this.instanceStub);
    }

    public withExecuteSucceding(): void {
        this.instanceStub.execute.returns(Promise.resolve());
    }

    public withExecuteThrowingError(message: string): void {
        this.instanceStub.execute.throws(new Error(message));
    }

    public expectExecuteWasCalledOnceForZapato(zapatoId: string): void {
        expect(this.constructorStub.calledOnce).toBe(true);
        const call = this.constructorStub.getCall(0);
        expect(call.args[0]).toBe(zapatoId);
        expect(this.instanceStub.execute.calledOnce).toBe(true);
    }
}