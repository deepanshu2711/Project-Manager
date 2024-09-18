import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json("Cookie not found");
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!verify) {
      return res.status(401).json("unAuthenticated");
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong");
  }
};
