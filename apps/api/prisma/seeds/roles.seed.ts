import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRoles() {
    const roles = [
        {
            name: "Super Admin",
            code: "SUPER_ADMIN",
            description: "System Super Administrator",
        },
        {
            name: "School Admin",
            code: "SCHOOL_ADMIN",
            description: "School Administrator",
        },
        {
            name: "Teacher",
            code: "TEACHER",
            description: "Teacher",
        },
        {
            name: "Student",
            code: "STUDENT",
            description: "Student",
        },
        {
            name: "Parent",
            code: "PARENT",
            description: "Parent",
        },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: {
                code: role.code,
            },
            update: {},
            create: role,
        });
    }

    console.log("✅ Roles Seeded");
}