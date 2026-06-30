import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { currentUserController } from "../controllers/current-user.controller";

const router = Router();

router.post("/login", loginController);


router.get("/me", authMiddleware, currentUserController);

export default router;