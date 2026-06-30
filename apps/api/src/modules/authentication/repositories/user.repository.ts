import { prisma } from "../../../lib/prisma";

export const userRepository = {
    async findByLogin(login: string) {
        return prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: login,
                    },
                    {
                        email: login,
                    },
                    {
                        mobile: login,
                    },
                ],
            },
            include: {
                role: true,
            },
        });
    },
};