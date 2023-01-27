import User from "../models/userModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import uuid from "uuid";

dotenv.config();
const secret = process.env.SECRET_KEY;
const accessToken = (id: any, roles: any) => {
  const payload = { id, roles };

  if (secret) {
    return jwt.sign(payload, secret, { expiresIn: "10s" }); //24h
  }
};

const refreshToken = (id: any) => {
  const payload = { id };

  if (secret) {
    return jwt.sign(payload, secret, { expiresIn: "20s" }); //30d
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ error: `User with email ${email} is not exists` });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Wrong password" });
  }
  const generateAccessToken = accessToken(user._id, user.roles);
  const generateRefreshToken = refreshToken(user._id);

  res.cookie("jwt", generateRefreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 30 * 24 * 60 * 1000,
  });
  res.status(200).json(generateAccessToken);
};
const registration = async (req: Request, res: Response) => {
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
const logoutUser = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); ///???
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ mssg: "cookies cleared" });
};
// const activateUser = async (req: Request, res: Response) => {};
const getRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401);
  }
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.status(403);
  }
  if (secret) {
    jwt.verify(
      refreshToken,
      secret,
      async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ err: "error1" });
        const foundUser = await User.findOne({ _id: decoded.id });
        if (!foundUser) {
          return res.status(401).json({ mssg: "user is not logged in" });
        }

        const generateAccessToken = accessToken(foundUser._id, foundUser.roles);
        res.status(200).json(generateAccessToken);
      } // ??
    );
  }
  // const NewRefreshToken = refreshToken(foundUser._id, foundUser.roles);
  // foundUser.refreshToken = NewRefreshToken
  // const saveUserToDb = await foundUser.save()
  // console.log(saveUserToDb)
  // res.cookie("jwt", NewRefreshToken, {
  //   httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
  //   maxAge: 30 * 24 * 60 * 1000,
  // });
};

// const getUsers = async (req: Request, res: Response) => {};

export const authController = {
  login,
  registration,
  logoutUser,

  getRefreshToken,
  // getUsers,
  // activateUser,
};

