import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {getRepository, Repository} from "typeorm";
import {UserDto} from "./dto/user.dto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export type User = {
    userId: number;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {

    }

    async findByNameOrEmail(nameOrEmail: string): Promise<UserEntity> {

        const qb = await getRepository(UserEntity).createQueryBuilder("user");

        qb.where("user.username = :name", {name: nameOrEmail});
        qb.orWhere("user.email = :email", {email: nameOrEmail});

        return await qb.getOne();
    }

    async create(userDto: UserDto): Promise<UserEntity> {
        const qb = await getRepository(UserEntity).createQueryBuilder("user");

        qb.where("user.username = :username", {username: userDto.username});
        qb.orWhere("user.email = :email", {email: userDto.email});

        const user = await await qb.getOne();

        if(user) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "用户名或邮箱已存在"
            }, HttpStatus.BAD_REQUEST);
        }else {
            const password = await bcrypt.hash(userDto.password,10);
            return this.usersRepository.save({
                ...userDto,
                password
            });
        }

    }

}


