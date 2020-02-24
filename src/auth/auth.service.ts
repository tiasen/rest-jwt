import { Injectable } from '@nestjs/common';
import { UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../users/user.entity";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async userValideUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByName(username);

        if(user && await bcrypt.compare(pass, user.password )) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: UserEntity){
        const payload = {username: user.username, sub: user.id};

        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            access_token: this.jwtService.sign(payload)
        }

    }

}
