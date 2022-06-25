/* eslint-disable prettier/prettier */
import { SinonSandbox, SinonStub, SinonStubbedInstance } from 'sinon';
import expect from "expect";
import * as addZapatoTaskModule from "../../../../src/Service-layer/tasks/AddZapatoTask"
import Zapato from "../../../../src/domain-layer/Zapato";
import { addZapatoInf } from "../../../../src/Service-layer/tasks/AddZapatoTask";

export default class AddZapatoTaskMock {
    private readonly instanceStub: SinonStubbedInstance<addZapatoTaskModule.default>;

    private readonly constructorStub: SinonStub;

    public constructor(sandbox: SinonSandbox) {
        this.instanceStub = sandbox.createStubInstance(addZapatoTaskModule.default);
        this.constructorStub = sandbox.stub(addZapatoTaskModule, 'default');
        this.constructorStub.returns(this.instanceStub);
    }

    public withExecuteReturning(zapato: Zapato): void {
        this.instanceStub.execute.returns(Promise.resolve(zapato));
    }

    public withExecuteThrowingError(message: string): void {
        this.instanceStub.execute.throws(new Error(message));
    }

    public expectExecuteWasCalledOnceWithZapatoData(zapData: addZapatoInf): void {
        expect(this.constructorStub.calledOnce).toBe(true);
        const call = this.constructorStub.getCall(0);
        expect(call.args[0]).toEqual(zapData);
        expect(this.instanceStub.execute.calledOnce).toBe(true);
    }
}