/* eslint-disable prettier/prettier */
import { DataSource, EntityTarget, Repository } from "typeorm";
import InventoryIns from "../domain-layer/InventoryIns";
import Zapato from "../domain-layer/Zapato";

export default class DatabaseConnection {
  private static instance: DatabaseConnection;

  private dataSource: DataSource;

  private constructor(){
    this.dataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Meza4870",
      database: "zapatos_catalog",
      entities: [Zapato, InventoryIns],
      synchronize: true,
    });
  }

  public getRepo<Entity>(target: EntityTarget<Entity>): Repository<Entity> {
    return this.dataSource.getRepository(target);
  }

  public static async getInstance(): Promise<DatabaseConnection> {
    if(!DatabaseConnection.instance){
      DatabaseConnection.instance = new DatabaseConnection();
      await DatabaseConnection.instance.waitForInitialized();
    }
    return DatabaseConnection.instance;
  }

  private async waitForInitialized(): Promise<void> {
    await this.dataSource.initialize();
  }
}