import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {getRepository, Repository} from "typeorm";
import {UserDto} from "./dto/user.dto";
import {ResponseUserDto} from "./dto/response-user.dto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');


@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {

    }

    async findByName(name: string): Promise<UserEntity> {

        const qb = await getRepository(UserEntity).createQueryBuilder("user");

        qb.where("user.username = :name", {name: name});

        return await qb.getOne();
    }

    async create(userDto: UserDto): Promise<ResponseUserDto> {
        const qb = await getRepository(UserEntity).createQueryBuilder("user");

        qb.where("user.username = :username", {username: userDto.username});

        const user = await qb.getOne();

        if(user) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "用户名已存在"
            }, HttpStatus.BAD_REQUEST);
        }else {
            const password = await bcrypt.hash(userDto.password,10);
            const user =  await this.usersRepository.save({
                ...userDto,
                password
            });
            if(user) {
                const {password, ...result} = user;
                return result;
            }
            return null;
        }

    }

}


