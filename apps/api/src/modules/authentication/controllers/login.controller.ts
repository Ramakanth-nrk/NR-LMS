import { Request, Response } from "express";
import { loginSchema } from "../schemas/login.schema";
import { loginService } from "../services/login.service";

export async function loginController(
    req: Request,
    res: Response
) {
    try {
        const data = loginSchema.parse(req.body);

        const result = await loginService.login(
            data.login,
            data.password
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}