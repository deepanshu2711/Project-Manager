import { Request, Response } from "express";
import { Project } from "../models/project";
import { Organization } from "../models/org";

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

    await Organization.findOneAndUpdate(
      { _id: orgId },
      { $push: { projects: project._id } },
    );

    return res.status(201).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong please try again later");
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId, orgId } = req.query;

  try {
    await Project.deleteOne({ _id: projectId });

    await Organization.findOneAndUpdate(
      { _id: orgId },
      { $pull: { projects: projectId } },
    );

    res.status(200).json("Project deleted successfully");
  } catch (error) {
    console.log(error);

    res.status(500).json("Something went wrong please try again later");
  }
};
