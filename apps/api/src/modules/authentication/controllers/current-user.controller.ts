import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";

export function currentUserController(
    req: AuthRequest,
    res: Response
) {
    return res.json({
        success: true,
        data: req.user,
    });
}