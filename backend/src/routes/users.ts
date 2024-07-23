import express from "express";
import {userController} from "../controllers/userController";




const router = express.Router();

const { getUsers, deleteUser, updateUser, createUser } =
  userController;

//GET all 
router.get("/", getUsers);

//CREATE one
router.post("/", createUser)

//DELETE one
router.delete("/:id", deleteUser);
//UPDATE one
router.patch("/:id", updateUser);



export default router;
