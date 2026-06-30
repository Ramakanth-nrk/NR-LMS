import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || "5000",

    DATABASE_URL: process.env.DATABASE_URL || "",

    JWT_SECRET: process.env.JWT_SECRET || "NR_LMS_SECRET_KEY",

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",

    REFRESH_TOKEN_EXPIRES_IN:
        process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
};