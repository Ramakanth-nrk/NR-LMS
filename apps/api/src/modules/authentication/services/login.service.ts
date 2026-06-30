import bcrypt from "bcrypt";
import { generateAccessToken } from "../../../config/jwt";
import { userRepository } from "../repositories/user.repository";

export const loginService = {
    async login(login: string, password: string) {
        // Find user
        const user = await userRepository.findByLogin(login);

        if (!user) {
            throw new Error("Invalid username or password");
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            throw new Error("Invalid username or password");
        }

        // Generate JWT
        const accessToken = generateAccessToken({
            id: user.id,
            username: user.username,
            role: user.role.code,
        });

        // Return safe response
        return {
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role.code,
            },
        };
    },
};