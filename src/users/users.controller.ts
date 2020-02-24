import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthGuard} from "@nestjs/passport";
import { ApiResponse, ApiBearerAuth, ApiTags, ApiHeader, ApiUnauthorizedResponse } from '@nestjs/swagger';
import {ResponseUserDto} from "./dto/response-user.dto";

@ApiBearerAuth()
@ApiTags("user")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiHeader({
        name: 'Authorization',
        description: 'token',
        required: true
    })
    @ApiResponse({
        status: 200,
        description: '获取用户信息',
        type: ResponseUserDto,
    })
    @ApiUnauthorizedResponse({
        description: "用户信息失效"
    })
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
