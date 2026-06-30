import { Request, Response } from "express";
import { ApiResponse } from "../shared/responses/api-response";

export function notFoundMiddleware(
    req: Request,
    res: Response
) {
    return res.status(404).json(
        new ApiResponse(
            false,
            `Route ${req.originalUrl} not found`
        )
    );
}