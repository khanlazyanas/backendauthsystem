import express from "express"
import { getuser, login, logout, register } from "../controllers/authcontrollers.js";
import authmiddleware from "../middlewares/authmiddleware.js";


const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/user",authmiddleware, getuser)

export default router;