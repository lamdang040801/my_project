import Database from "../services/database";
import { Base } from "./Base";

export default class User extends Base {
    username: string;
    password: string;
    gender: Gender = Gender.Other;
    age: number = 18;

    constructor(newUser: {
        username: string,
        password: string,
        gender: Gender,
        age: number
    }) {
        super();
        this.username = newUser.username;
        this.password = newUser.password;
        this.gender = newUser.gender;
        this.age = newUser.age;
    }

    public inputFrom(updateInput: any) {
        const {username, password, gender, age} = updateInput;
        username ? this.username = username :  0;
        password ? this.password = password : 0;
        gender ? this.gender = gender : 0;
        age ? this.age = age : 0;
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
            `MATCH (n:User) WHERE n.id = $id 
            SET n = $user
            RETURN properties(n) as user`,
            { id: user.id, user }
        );
        await session.close();
        return result.records[0].get('user') as User
    }

    public static async findUserById(id: string) {
        const session = await Database.getSession();
        const result = await session.run(
            'MATCH (n:User) WHERE n.id = $id RETURN properties(n) as user',
            { id: id }
        );
        await session.close();
        return result.records.length > 0
            ? result.records[0].get('user') as User
            : null
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

    public static async delete(id: string) {
        const session = await Database.getSession();
        const result = await session.run(
            'MATCH (n:User) WHERE n.id = $id delete n',
            { id: id }
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