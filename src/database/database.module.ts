import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {databaseConfig} from "../config/configuration";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../users/user.entity";

@Module({
    imports: [
        ConfigModule.forFeature(databaseConfig),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ...configService.get('database'),
                entities: [UserEntity],
            }),
        })
    ],
    exports:[TypeOrmModule]
})
export class DatabaseModule {

}
