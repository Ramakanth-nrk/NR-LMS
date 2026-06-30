import bcrypt from "bcrypt";
import { generateAccessToken } from "../../../config/jwt";
import { userRepository } from "../repositories/user.repository";

export async function login(username: string, password: string) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
        throw new Error("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        throw new Error("Invalid username or password");
    }

    const token = generateAccessToken({
        id: user.id,
        username: user.username,
        role: user.role.code,
    });

    return {
        accessToken: token,
        user,
    };
}