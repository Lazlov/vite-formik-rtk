import mongoose from "mongoose";
import User from "../models/userModel";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.status(200).json(users);
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

export const userController = {getUsers, deleteUser, updateUser };
// export default userController;
