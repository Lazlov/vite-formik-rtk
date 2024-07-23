import express from "express";
import {authController} from "../controllers/authController";
const router = express.Router();

const { login, logoutUser, getRefreshToken } = authController  

router.post("/login", login)
router.post("/logout", logoutUser)
router.get("/refresh", getRefreshToken);


export default router
