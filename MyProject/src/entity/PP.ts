import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class t_applet_project_products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  PROJECT_ID: number;

  @Column()
  PRODUCT_NAME: string;

  @Column()
  DOSAGE: string;
  @Column()
  UNIT: string;
  @Column()
  COST: number;
}
