import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from "./constants";
import {User} from "../users/users.service";
import {Injectable} from "@nestjs/common";
import {JwtPayload} from "./auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy ) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate (payload: JwtPayload) {
        return {userId: payload.sub, username: payload.username, emil: payload.email};
    }
}