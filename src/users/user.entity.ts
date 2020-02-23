import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, MinLength} from "class-validator";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4)
    username: string;

    @Column()
    password: string;

    @Column()
    @IsEmail()
    email: string;
}