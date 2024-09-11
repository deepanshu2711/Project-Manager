import { Request, Response } from "express";
import { User } from "../models/user";
import bcrpytjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json("email is required").status(200);
  }
  if (!password) {
    return res.json("password is required").status(200);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json("No user found!").status(200);
    }

    const isCorrect = bcrpytjs.compareSync(password, user?.password as string);

    if (!isCorrect) {
      return res.json("password is incorrect").status(200);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.cookie("token", token);
    res.json({ message: "Logged in sucessfully!", user: user }).status(201);
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong please try again later").status(500);
  }
};

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body;
  console.log(email, password, name, avatar);

  if (!email || !password || !name || !avatar) {
    return res.status(200).json("Please enter all required fields");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json("A user already exists with this email!");
    }

    const hashedPassword = bcrpytjs.hashSync(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      avatar,
    });

    if (!user) {
      return res.status(500).json("Something went wrong");
    }

    return res.status(201).json({ message: "Sign up successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong, please try again later");
  }
};
