/* eslint-disable prettier/prettier */
import request from "supertest";
import sinon from "sinon";
import expect from "expect";

import app from "../../../src/app";
import Zapato from "../../../src/domain-layer/Zapato";
import GetZapatoListTaskMock from "./test-doubles/GetZapatoListTaskMock";
import FindZapatoTaskMock from "./test-doubles/FindZapatoTaskMock";
import AddZapatoTaskMock from "./test-doubles/AddZapatoTaskMock";
import UpdateZapatoTaskMock from "./test-doubles/UpdateZapatoTaskMock";
import DeleteZapatoTaskMock from "./test-doubles/DeleteZapatoTaskMock";
import { addZapatoInf } from "../../../src/Service-layer/tasks/AddZapatoTask";
import { UpdateZapatoData } from "../../../src/Service-layer/tasks/UpdateZapatoTask";



describe("ZapatosController tests", () => {
    let sandbox: sinon.SinonSandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    });
    
    afterEach(() => {
        sandbox.restore();
    });
    
    context("Get zapatos list endpoint tests", () => {
        let getZapatoListTaskMock: GetZapatoListTaskMock;

        const zapatosList: Zapato[] = [
            new Zapato("1", "Adidas", 15, "Blanco"),
            new Zapato("2", "Jordan", 20, "Azul"),
            new Zapato("3", "Nike", 9, "Naranja"),
        ];

        beforeEach(() => {
            getZapatoListTaskMock = new GetZapatoListTaskMock(sandbox);
        });

        it("should respond 200 and respond with a list of zapatos", async () => {
            getZapatoListTaskMock.withExecuteReturning(zapatosList);

            const response = await request(app)
            .get("/Zapatos")
            .expect(200);

            expect(response.body).toEqual(zapatosList);
            getZapatoListTaskMock.expectExecuteWasCalledOnce();
        });

        it("should handle unknown errors and respond with 500", async () => {
            getZapatoListTaskMock.withExecuteThrowingError("Esto no me agrada pana...");

            await request(app)
            .get("/Zapatos")
            .expect(500);
            
            getZapatoListTaskMock.expectExecuteWasCalledOnce();
        });
    });

    context("Find zapato endpoint tests", () => {
        let findZapatoTaskMock: FindZapatoTaskMock;

        const zapatoId = "1";
        const zapato = new Zapato(zapatoId, "Marca1", 1, "Color1");

        beforeEach(() => {
            findZapatoTaskMock = new FindZapatoTaskMock(sandbox);
        });

        it("should respond 200", async () => {
            findZapatoTaskMock.withExecuteReturning(zapato);

            const response = await request(app).get(`/Zapatos/${zapatoId}`);
            expect(response.body).toEqual(zapato);
            findZapatoTaskMock.expectExecuteWasCalledOnceForZapato(zapatoId);
        });

        it("should respond 404 if it doesn't exists", async () => {
            findZapatoTaskMock.withExecuteThrowingNotFoundError();

            await request(app)
            .get(`/Zapatos/${zapatoId}`)
            .expect(404);

            findZapatoTaskMock.expectExecuteWasCalledOnceForZapato(zapatoId);
        });

        it("should handle unknown errors and respond 500 Internal Error Server", async () => {
            findZapatoTaskMock.withExecuteThrowingError("You may not pass!");

            await request(app).get(`/Zapatos/${zapatoId}`).expect(500);
            findZapatoTaskMock.expectExecuteWasCalledOnceForZapato(zapatoId);
        });
    });

    context("Add zapato endpoint tests", () => {
        let addZapatoTaskMock: AddZapatoTaskMock;

        const zapatoData: addZapatoInf = { 
            marca: "Brand1", 
            talla: 1, 
            color: "white"}
        const zapato = new Zapato(
            "1", 
            zapatoData.marca, 
            zapatoData.talla, 
            zapatoData.color);

        beforeEach(() => {
            addZapatoTaskMock = new AddZapatoTaskMock(sandbox);
        });

        it("should respond 200 with a newly created zapato", async () => {
            addZapatoTaskMock.withExecuteReturning(zapato);

            const response = await request(app)
            .post("/Zapatos")
            .set("Content-Type", "application/json")
            .send(zapatoData).expect(200);

            expect(response.body).toEqual(zapato);
            addZapatoTaskMock.expectExecuteWasCalledOnceWithZapatoData(zapatoData)
        });

        it("should handle unknown errors and respond with 500 Internal Server Error", async () => {
            addZapatoTaskMock.withExecuteThrowingError("What does you elf eyes see?");

            await request(app).post("/Zapatos").set("Content-Type", "application/json").send(zapatoData).expect(500);

            addZapatoTaskMock.expectExecuteWasCalledOnceWithZapatoData(zapatoData);
        });
    });

    context("Update car endpoint tests", () => {
        let updateZapatoTaskMock: UpdateZapatoTaskMock;

        const zapatoData: UpdateZapatoData = { id: "1", marca: "marca1", talla: 1, color: "blanco" }
        const zapato = new Zapato(zapatoData.id, zapatoData.marca, zapatoData.talla, zapatoData.color);

        beforeEach(() => {
            updateZapatoTaskMock = new UpdateZapatoTaskMock(sandbox);
        });

        it("should respond 200 with a zapato", async () => {
            updateZapatoTaskMock.withExecuteReturning(zapato);

            const response = await request(app).put("/Zapatos").set("Content-Type", "application/json").send(zapatoData).expect(200);
            expect(response.body).toEqual(zapato);
            updateZapatoTaskMock.expectExecuteWasCalledOnceWithZapatoData(zapatoData);
        });

        it("should respond 404 NotFound if zapato does not exist", async () => {
            updateZapatoTaskMock.withExecuteThrowingNotFoundError();
            
            await request(app)
            .put("/Zapatos")
            .set("Content-Type", "application/json")
            .send(zapatoData)
            .expect(404);
            
            updateZapatoTaskMock.expectExecuteWasCalledOnceWithZapatoData(zapatoData);
        });

        it("Should handle unknown errors and respond 500 Internal Server Error", async () =>{
            updateZapatoTaskMock.withExecuteThrowingError("They're taking the hobbits to Isengard!");

            await request(app).put("/Zapatos").set("Content-Type", "application/json").send(zapatoData).expect(500);
            updateZapatoTaskMock.expectExecuteWasCalledOnceWithZapatoData(zapatoData);
        });
    });

    context('Delete zapato endpoint tests', () => {
        let deleteZapatoTaskMock: DeleteZapatoTaskMock;
    
        const ZapatoId = "1";
    
        beforeEach(() => {
          deleteZapatoTaskMock= new DeleteZapatoTaskMock(sandbox);
        });
    
        it('should respond 200 OK after deleting a zapato', async () => {
          deleteZapatoTaskMock.withExecuteSucceding();
    
          await request(app)
          .delete(`/Zapatos/${ZapatoId}`)
          .expect(200);
    
          deleteZapatoTaskMock.expectExecuteWasCalledOnceForZapato(ZapatoId);
        });
    
        it('should handle unknown errors and respond 500 Internal Server Error', async () => {
          deleteZapatoTaskMock.withExecuteThrowingError('One does not simply walk into Mordor...');
    
          await request(app)
            .delete(`/Zapatos/${ZapatoId}`)
            .expect(500);
    
          deleteZapatoTaskMock.expectExecuteWasCalledOnceForZapato(ZapatoId);
        });
      });
});