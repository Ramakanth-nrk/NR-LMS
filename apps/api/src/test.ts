import { generateAccessToken } from "./config/jwt";

const token = generateAccessToken({
    id: "1",
    username: "admin",
    role: "SUPER_ADMIN",
});

console.log(token);