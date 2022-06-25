/* eslint-disable prettier/prettier */
import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import expect from "expect";
import * as getZapatoTaskModule from "../../../../src/Service-layer/tasks/GetZapatoListTask";
import Zapato from "../../../../src/domain-layer/Zapato";

export default class GetZapatoListTaskMock {
    private readonly instanceStub: SinonStubbedInstance<getZapatoTaskModule.default>;

    private readonly constructorStub: SinonStub;

    public constructor(sandbox: SinonSandbox) {
        this.instanceStub = sandbox.createStubInstance(getZapatoTaskModule.default);
        this.constructorStub = sandbox.stub(getZapatoTaskModule, "default");
        this.constructorStub.returns(this.instanceStub);
    }

    public withExecuteReturning(zapato: Zapato[]): void {
        this.instanceStub.execute.returns(Promise.resolve(zapato));
    }

    public withExecuteThrowingError(message: string): void {
        this.instanceStub.execute.throws(new Error(message));
    }
    
    public expectExecuteWasCalledOnce(): void {
        expect(this.instanceStub.execute.calledOnce).toBe(true);
    }
}