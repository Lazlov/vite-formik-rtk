import mongoose from "mongoose";
import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).json(users);
};


const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    return res
      .status(404)
      .json({ error: `User with email ${email} already exists` });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 3); //await?  hashSync
    const user = await User.create({
      email,
      password: hashedPassword,
      roles: ["user"],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can't find user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "Can't find user" });
  }
  res.status(200).json(user);
};
//UPDATE ONE
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!user) {
    return res.status(404).json({ error: "Can't find user" });
  }
  res.status(200).json(user);
};

export const userController = {createUser,getUsers, deleteUser, updateUser };
// export default userController;
