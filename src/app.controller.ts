import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";
import {UserDto} from "./users/dto/user.dto";
import {UsersService} from "./users/users.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
        private readonly usersService: UsersService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }

    @Post("register")
    register(@Body() userDto: UserDto) {
        return this.usersService.create(userDto);
    }
}
