import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./users/user.entity";
import {ConfigService} from './config/config.service';
import {ConfigModule} from './config/config.module';

@Module({
    imports: [AuthModule, UsersModule, TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            type: "mysql" as any,
            host: configService.get('host'),
            port: configService.get("port") ,
            username: configService.get("username"),
            password: configService.get("password"),
            database: configService.get("database"),
            entities: [UserEntity],
            synchronize: true,
        }),
        inject: [ConfigService]
    }), ConfigModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
