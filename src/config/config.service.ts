import {Injectable} from '@nestjs/common';

@Injectable()
export class ConfigService {
    private readonly envConfig;

    constructor() {
        const {DB_HOST = 'localhost', DB_USERNAME = 'root', DB_PASSWORD = 'root', DB_DATABASE, DB_PORT = 3306} = process.env;
        this.envConfig = {
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_DATABASE,
        }
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}
