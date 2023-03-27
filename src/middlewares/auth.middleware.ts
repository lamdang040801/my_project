import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authString = req.headers['authentication'];
    console.log(authString)
    if(!authString) {
        return res.status(401).json({
            success: false,
            message: "Chưa đăng nhập"
        })
    }

    const token = (authString as string).split(' ')[1]
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Chưa đăng nhập"
        })
    }

    const authData = verify(token, process.env.JWT as string);
    req.body.authData = authData

    next()
}