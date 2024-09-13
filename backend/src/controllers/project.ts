import { Request, Response } from "express";
import { Project } from "../models/project";

export const createProject = async (req: Request, res: Response) => {
  const { name, description, orgId } = req.body;
  if (!name || !description) {
    return res.json("all fields are required").status(200);
  }

  try {
    const project = await Project.create({
      name,
      description,
      org: orgId,
    });

    return res.status(201).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong please try again later");
  }
};
