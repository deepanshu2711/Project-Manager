import express from "express";
import { signInController, signUpController } from "../controllers/user";

export const authRouter = express.Router();

authRouter.post("/signin", signInController);
authRouter.post("/signup", signUpController);
