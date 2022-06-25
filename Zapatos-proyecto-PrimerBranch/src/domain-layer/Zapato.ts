/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

  @Entity()
  export default class Zapato {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true, zerofill: true})
    public id: string;
  
    @Column({ type: "varchar", length: 16, nullable: false })
    public marca: string;
  
    @Column({ type: "int", nullable: false })
    public talla: number;
  
    @Column({ type: "varchar", length: 16, nullable: false })
    public color: string;
  
    public constructor(id: string, marca: string, talla: number, color: string) {
      this.id = id;
      this.marca = marca;
      this.talla = talla;
      this.color = color;
    }
  }