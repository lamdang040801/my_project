import Database from "../services/database";

export default class User {
    username: string;
    password: string;
    gender: Gender = Gender.Other;
    constructor(user: User) {
        this.username = user.username;
        this.password = user.password;
        this.gender = user.gender;
    }

    public static async getAll() {
        const session = await Database.getSession();
        const result = await session.run(
            'MATCH (n:User) RETURN DISTINCT collect(properties(n)) as p',
            {}
        );
        await session.close();
        return result.records[0].get('p') as User[]
    }

    public static async Create(user: User) {
        const session = await Database.getSession();
        const result = await session.run(
            'CREATE (n:User $properties) RETURN properties(n) as user',
            { properties: user }
        );
        await session.close();
        return result.records[0].get('user') as User
    }

    public static async Update(user: User) {
        const session = await Database.getSession();
        const result = await session.run(
            `MATCH (n:User) WHERE n.username = $username 
            SET n = $user
            RETURN properties(n) as user`,
            { username: user.username, user }
        );
        await session.close();
        return result.records[0].get('user') as User
    }

    public static async findUserByUsername(username: string) {
        const session = await Database.getSession();
        const result = await session.run(
            'MATCH (n:User) WHERE n.username = $username RETURN properties(n) as user',
            { username: username }
        );
        await session.close();
        return result.records.length > 0
            ? result.records[0].get('user') as User
            : null
    }

    public static async delete(username: string) {
        const session = await Database.getSession();
        const result = await session.run(
            'MATCH (n:User) WHERE n.username = $username delete n',
            { username: username }
        );
        await session.close();
        return result.summary.counters.containsUpdates()
    }
}

export enum Gender {
    Male = 0,
    Female = 1,
    Other = 2
}