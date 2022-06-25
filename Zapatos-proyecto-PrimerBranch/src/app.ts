/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import { json } from 'body-parser';
import 'reflect-metadata';
// import CarsController from './service-layer/controllers/CarsController';
// import InventoryInsController from './service-layer/controllers/InventoryInsController';
import ZapatosController from './Service-layer/controllers/ZapatosController';
import InventoryInsController from './Service-layer/controllers/InventoryInsController';

const app = express();

app.use(json());

const carsController = new ZapatosController();

carsController.mount(app);

export default app;
