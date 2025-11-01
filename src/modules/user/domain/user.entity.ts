/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, name: "plan_activo" })
  activePlan?: string;

  @CreateDateColumn({ name: "fecha_registro" })
  registrationDate: string;
}
