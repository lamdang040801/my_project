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
        const { username, password, gender, age } = req.body;

        // New User
        const newUser = new User({
            username: username,
            password: password,
            gender: gender,
            age: age
        });

        // Check if 'username' exists
        const existedUser = await User.findUserByUsername(newUser.username);
        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "username tồn tại"
            })
        }

        // Create new User
        const result = await User.Create(newUser);

        return res.status(200).json({
            success: true,
            data: result
        })
    }

    public static async updateUser(req: Request, res: Response) {
        const { id, username } = req.body;

        // Check if user exists
        const existedUser = await User.findUserById(id);
        if (!existedUser) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy user"
            })
        }

        // Check if 'username' exists
        const nameExistedUser = await User.findUserByUsername(username);
        if (nameExistedUser) {
            return res.status(400).json({
                success: false,
                message: "username tồn tại"
            })
        }

        // Update User
        existedUser.inputFrom(req.body)
        const result = await User.Update(existedUser);

        return res.status(200).json({
            success: true,
            data: result
        })
    }

    public static async deleteUser(req: Request, res: Response) {
        const { id } = req.body;

        const currentUser = await User.findUserById(id);
        if (!currentUser) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy user"
            })
        }

        if (!await User.delete(id)) {
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