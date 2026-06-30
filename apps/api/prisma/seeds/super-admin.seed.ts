import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedSuperAdmin() {
    const role = await prisma.role.findUnique({
        where: {
            code: "SUPER_ADMIN",
        },
    });

    if (!role) {
        throw new Error("SUPER_ADMIN role not found.");
    }

    const existingAdmin = await prisma.user.findFirst({
        where: {
            username: "admin",
            schoolId: null,
        },
    });

    if (existingAdmin) {
        console.log("✅ Super Admin already exists");
        return;
    }

    const passwordHash = await bcrypt.hash("Admin@123", 10);

    await prisma.user.create({
        data: {
            username: "admin",
            email: "admin@nrlms.com",
            passwordHash,
            roleId: role.id,
            status: "ACTIVE",
        },
    });

    console.log("✅ Super Admin Seeded");
}