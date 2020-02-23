export default class DbEnv {
    static getEnv(){
        const {DB_HOST = 'localhost', DB_USERNAME = 'root', DB_PASSWORD = 'root', DB_DATABASE, DB_PORT = 3306} = process.env;
        return {
            host: DB_HOST ,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_DATABASE,
        }
    }
}