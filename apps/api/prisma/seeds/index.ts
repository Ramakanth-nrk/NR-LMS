import { seedRoles } from "./roles.seed";
// import { seedPermissions } from "./permissions.seed";
import { seedSuperAdmin } from "./super-admin.seed";

async function main() {
    await seedRoles();
    // await seedPermissions();
    await seedSuperAdmin();
}

main()
    .then(() => {
        console.log("✅ Database Seed Completed");
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });