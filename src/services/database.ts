import neo4j, { Driver } from 'neo4j-driver';

export default class Database {

    public static driver: Driver;
    public static async init(): Promise<void> {
        const username = process.env.DATABASE_USERNAME as string;
        const password = process.env.DATABASE_PASSWORDas as string;
        const url = process.env.DATABASE_URL as string;
        this.driver = neo4j.driver(
            url,
            neo4j.auth.basic(username, password),
            {disableLosslessIntegers: true}
        );

        process.on('exit', () => {
            console.log('Close Database')
            this.driver.close();
        })
    }
    public static async getSession() {
        const database = process.env.DATABASE_NAME as string;
        return this.driver.session({
            database: database,
            defaultAccessMode: neo4j.session.WRITE
        })
    }

}