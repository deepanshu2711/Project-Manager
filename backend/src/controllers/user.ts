import { Request, Response } from "express";
import { User } from "../models/user";
import bcrpytjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json("email is required").status(400);
  }
  if (!password) {
    return res.json("password is required").status(400);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json("No user found!").status(404);
    }

    const isCorrect = bcrpytjs.compareSync(password, user?.password as string);

    if (!isCorrect) {
      return res.json("password is incorrect").status(401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.cookie("token", token);
    res.json({ message: "Logged in sucessfully!", user: user }).status(200);
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong please try again later").status(500);
  }
};

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body;
  if (!email || !password || !name || !avatar) {
    return res.json("Please enter all required fields").status(400);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json("A user already exists with this email!").status(404);
    }

    const hashedPassword = bcrpytjs.hashSync(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      avatar,
    });
    if (!user) {
      return res.json("Sonmething went wrong").status(500);
    }
    return res.json({ message: "Sign up sucessfully!" }).status(200);
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong please try again later").status(500);
  }
};
