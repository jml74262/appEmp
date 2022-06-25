/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Zapato from "./Zapato";

@Entity()
export default class InventoryIns {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true, zerofill: true})
  public id: number;

  @ManyToOne(() => Zapato)
  @JoinColumn()
  public zapato: Zapato;

  @Column({ type: "smallint", nullable: false})
  public quantity: number;

  @Column({ type: "datetime", nullable: false })
  public date: Date;

  public constructor(id: number, zapato: Zapato, quantity: number, date: Date){
    this.id = id;
    this.zapato = zapato;
    this.quantity = quantity;
    this.date = date;
  }
}
