import { NextFunction, Request, Response } from "express";
import { ApiError } from "../shared/errors/api-error";
import { HttpStatus } from "../shared/constants/http-status";
import { ApiResponse } from "../shared/responses/api-response";

export function errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json(
            new ApiResponse(
                false,
                error.message
            )
        );
    }

    console.error(error);

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        new ApiResponse(
            false,
            "Internal Server Error"
        )
    );
}