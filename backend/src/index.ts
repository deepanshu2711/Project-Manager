import express from "express";
import { authRouter } from "./routes/user";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { orgRouter } from "./routes/org";
import { projectRouter } from "./routes/project";
import { verifyToken } from "./middlewares/checktoken";
dotenv.config();

export const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/org", verifyToken, orgRouter);
app.use("/api/project", verifyToken, projectRouter);
