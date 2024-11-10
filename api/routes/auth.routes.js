import express from "express";
import { login, register } from "../controllers/authController.js";
// import { protectedRoute } from "../middlewares/authorizeUser.js";
import { logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",login);
router.post("/logout", logout);

export default router;