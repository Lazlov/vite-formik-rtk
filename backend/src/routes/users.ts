import express from "express";
import {userController} from "../controllers/userController";




const router = express.Router();

const { getUsers, deleteUser, updateUser } =
  userController;

//GET all 
router.get("/", getUsers);

//DELETE one
router.delete("/:id", deleteUser);
//UPDATE one
router.patch("/:id", updateUser);



export default router;
