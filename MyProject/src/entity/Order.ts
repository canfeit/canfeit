import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { t_applet_user as User } from "./User";

@Entity()
export class t_applet_order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  USER_ID: number;

  @Column()
  PROJECT_ID: number;

  @Column()
  TRADESTATE: string;
  @Column()
  SERVICE_END_TIME: string;
}
