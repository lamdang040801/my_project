import { NextFunction, Request, Response } from "express";
import Database from '../services/database';

export default class ActorController {
    public static async getAll(req: Request, res: Response) {

        const session = await Database.getSession()
        const result = await session.run(
            'MATCH (n:Person) RETURN DISTINCT collect(properties(n)) as p',
            {}
        );
        res.status(200).json({
            success: true,
            data: result.records[0].get('p')
        })

        await session.close()
    }
}