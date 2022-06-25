/* eslint-disable prettier/prettier */
import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import expect from "expect";
import * as findZapatoTaskModule from "../../../../src/Service-layer/tasks/FindZapatoTask";
import Zapato from "../../../../src/domain-layer/Zapato";

export default class FindZapatoTaskMock {
    private readonly instanceStub: SinonStubbedInstance<findZapatoTaskModule.default>;

    private readonly constructorStub: SinonStub;

    public constructor(sandbox: SinonSandbox) {
        this.instanceStub = sandbox.createStubInstance(findZapatoTaskModule.default);
        this.constructorStub = sandbox.stub(findZapatoTaskModule, "default");
        this.constructorStub.returns(this.instanceStub);
    }

    public withExecuteReturning(zapato: Zapato): void {
        this.instanceStub.execute.returns(Promise.resolve(zapato));
    }

    public withExecuteThrowingNotFoundError(): void {
        this.instanceStub.execute.throws(new Error("Zapato no encontrado."));
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