import jwt from "jsonwebtoken";
import { env } from "./env";

export interface JwtPayload {
    id: string;
    username: string;
    role: string;
}

export function generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_SECRET as string, {
        expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
}