/* eslint-disable prettier/prettier */
import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import { expect } from "expect";
import * as updateZapatoTaskModule from "../../../../src/Service-layer/tasks/UpdateZapatoTask";
import Zapato from "../../../../src/domain-layer/Zapato";
import { UpdateZapatoData } from "../../../../src/Service-layer/tasks/UpdateZapatoTask";

export default class UpdateZapatoTaskMock {
    private readonly instanceStub: SinonStubbedInstance<updateZapatoTaskModule.default>;

    private readonly constructorStub: SinonStub;

    public constructor(sandbox: SinonSandbox) {
        this.instanceStub = sandbox.createStubInstance(updateZapatoTaskModule.default);
        this.constructorStub = sandbox.stub(updateZapatoTaskModule, "default");
        this.constructorStub.returns(this.instanceStub);
    }

    public withExecuteReturning(zapato: Zapato): void {
        this.instanceStub.execute.returns(Promise.resolve(zapato));
    }

    public withExecuteThrowingNotFoundError(): void {
        this.instanceStub.execute.throws(new Error('Zapato no encontrado.'));
    }
    
    public withExecuteThrowingError(message: string): void {
        this.instanceStub.execute.throws(new Error(message));
    }
    
    public expectExecuteWasCalledOnceWithZapatoData(zapatoData: UpdateZapatoData): void {
        expect(this.constructorStub.calledOnce).toBe(true);
        const call = this.constructorStub.getCall(0);
        expect(call.args[0]).toEqual(zapatoData);
        expect(this.instanceStub.execute.calledOnce).toBe(true);
    }
}