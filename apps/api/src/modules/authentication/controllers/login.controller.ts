import { Request, Response } from "express";
import { login } from "../services/login.service";

export async function loginController(
    req: Request,
    res: Response
) {
    try {
        const { username, password } = req.body;

        const result = await login(username, password);

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result,
        });
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}