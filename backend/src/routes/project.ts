import express from "express";
import { createProject, deleteProject } from "../controllers/project";

export const projectRouter = express.Router();

projectRouter.post("/create", createProject);
projectRouter.delete("/delete", deleteProject);
