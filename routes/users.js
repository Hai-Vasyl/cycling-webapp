import { Router } from "express";
import { loginUser, registerUser, getUserData } from "../controllers/users.js";
import login from "../validations/loginUser.js"
import register from "../validations/registerUser.js"
import auth from "../middlewares/auth.js"

const router = Router()

router.post("/register", register, registerUser)
router.post("/login", login, loginUser)

router.get("/get-user", auth, getUserData)

export default router