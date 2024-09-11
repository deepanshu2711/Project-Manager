import express from "express";
import { authRouter } from "./routes/user";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(8080, () => {
  console.log("server runnig on port 8080");
});
