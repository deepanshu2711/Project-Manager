import express from "express";
import { createOrg } from "../controllers/org";

export const orgRouter = express.Router();
orgRouter.post("/create", createOrg);
