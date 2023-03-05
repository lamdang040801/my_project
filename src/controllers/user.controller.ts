import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Database from '../services/database';

export default class UserController {
    public static async getAll(req: Request, res: Response) {
        const userList = await User.getAll();

        return res.status(200).json({
            success: true,
            data: userList
        })
    }

    public static async createUser(req: Request, res: Response) {
        const { username, password, gender } = req.body;

        const newUser = new User({
            username: username,
            password: password,
            gender: gender
        });

        const currentUser = await User.findUserByUsername(newUser.username);
        if(currentUser) {
            return res.status(400).json({
                success: false,
                message: "User tồn tại"
            })
        }

        const result = await User.Create(newUser);
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    public static async updateUser(req: Request, res: Response) {
        const { username, password, gender } = req.body;

        const updateUser = new User({
            username: username,
            password: password,
            gender: gender
        });

        const currentUser = await User.findUserByUsername(updateUser.username);
        if(!currentUser) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy user"
            })
        }

        const result = await User.Update(updateUser);
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    public static async deleteUser(req: Request, res: Response) {
        const { username } = req.body;

        const currentUser = await User.findUserByUsername(username);
        if(!currentUser) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy user"
            })
        }

        if(!await User.delete(username)) {
            return res.status(400).json({
                success: false,
                message: "Xóa thất bại"
            }) 
        }

        return res.status(200).json({
            success: true,
            message: "Xóa thành công"
        })
    }
}