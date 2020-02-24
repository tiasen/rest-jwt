import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { MinLength} from "class-validator";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4)
    username: string;

    @Column()
    password: string;

}