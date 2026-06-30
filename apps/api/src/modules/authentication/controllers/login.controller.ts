import { Request, Response } from "express";
import { loginSchema } from "../schemas/login.schema";
import { loginService } from "../services/login.service";
import { asyncHandler } from "../../../shared/handlers/async-handler";
import { ApiResponse } from "../../../shared/responses/api-response";

export const loginController = asyncHandler(
    async (req: Request, res: Response) => {

        const data = loginSchema.parse(req.body);

        const result = await loginService.login(
            data.login,
            data.password
        );

        return res.status(200).json(
            new ApiResponse(
                true,
                "Login successful",
                result
            )
        );

    }
);