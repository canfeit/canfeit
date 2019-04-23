import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from "typeorm";
import { t_applet_order as Order } from "./Order";

@Entity()
export class t_applet_user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  RECOMMEND_LOGIN_NAME: string;

  @Column()
  LOGIN_NAME: string;

  @Column()
  NICK_NAME: string;
}
