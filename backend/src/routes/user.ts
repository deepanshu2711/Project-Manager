import express from "express";
import {
  Logout,
  signInController,
  signUpController,
} from "../controllers/user";

export const authRouter = express.Router();

authRouter.post("/signin", signInController);
authRouter.post("/signup", signUpController);
authRouter.get("/logout", Logout);
