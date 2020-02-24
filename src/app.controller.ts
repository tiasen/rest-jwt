import {Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";
import {UserDto} from "./users/dto/user.dto";
import {UsersService} from "./users/users.service";
import { ApiResponse, ApiUnauthorizedResponse, ApiBody, ApiExcludeEndpoint} from '@nestjs/swagger';
import {TokenDto} from "./app.interface";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
        private readonly usersService: UsersService) {
    }

    @ApiExcludeEndpoint()
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @ApiBody({
        type: UserDto
    })
    @ApiResponse({
        status: 200,
        description: '登录成功',
        type: TokenDto
    })
    @ApiUnauthorizedResponse({
        description: "登录失败"
    })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

    @ApiBody({
        type: UserDto
    })
    @ApiResponse({
        status: 200,
        description: '注册成功'
    })
    @Post("register")
    register(@Body() userDto: UserDto) {
         return this.usersService.create(userDto);
    }
}
