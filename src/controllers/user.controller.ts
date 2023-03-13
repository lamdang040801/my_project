import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Database from '../services/database';

export default class UserController {
    public static async getAll(req: Request, res: Response) {

        try {

            const userList = await User.getAll();

            return res.status(200).json({
                success: true,
                data: userList
            })

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })

        }
    }

    public static async createUser(req: Request, res: Response) {
        const { username, password, gender, age } = req.body;

        try {

            // New User
            const newUser = new User({
                username: username,
                password: password,
                gender: gender,
                age: age
            });

            // Check if 'username' exists
            const existedUser = await User.findUsersByUsername(newUser.username);
            if (existedUser.length > 0) {
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

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })

        }
    }

    public static async updateUser(req: Request, res: Response) {
        const { id, username } = req.body;

        try {

            // Get User
            let existedUser = User.copy(await User.findUserById(id) as any);


            // Check if user exists
            if (!existedUser) {
                return res.status(400).json({
                    success: false,
                    message: "Không tìm thấy user"
                })
            }

            // Check if 'username' exists
            const nameExistedUser = await User.findUsersByUsername(username);
            if (nameExistedUser.length > 0 &&
                existedUser.username !== username
            ) {
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

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })

        }

    }

    public static async deleteUser(req: Request, res: Response) {
        const { id } = req.body;

        try {

            // Find User
            const currentUser = await User.findUserById(id);
            if (!currentUser) {
                return res.status(400).json({
                    success: false,
                    message: "Không tìm thấy user"
                })
            }

            // Delete User
            await User.delete(id);

            return res.status(200).json({
                success: true,
                message: "Xóa thành công"
            })

        } catch (error) {

            return res.status(500).json({
                success: true,
                message: "Internal Server Error"
            })

        }
    }
}