import { NextFunction, Request, Response } from "express";
import Database from '../services/database';
import User from "../models/User";

export default class MovieController {
    public static async getAll(req: Request, res: Response) {

        const session = await Database.getSession()
        const result = await session.run(
            'MATCH (n:Movie) RETURN DISTINCT collect(properties(n)) as m',
            {}
        );
        res.status(200).json({
            success: true,
            data: result.records[0].get('m')
        })

        await session.close()
    }

    public static async RateMovie(req: Request, res: Response) {
        const { id } = req.body;

        console.log(id)
        try {

            // Find User
            const currentUser = await User.findUserById(id);
            if (!currentUser) {
                return res.status(400).json({
                    success: false,
                    message: "Không tìm thấy user"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Bình chọn thành công"
            })

        } catch (error) {

            return res.status(500).json({
                success: true,
                message: "Internal Server Error"
            })

        }
    }
}