import { Request, Response } from "express";
import { Organization } from "../models/org";

export const createOrg = async (req: Request, res: Response) => {
  const { name, description, imageUrl, userId } = req.body;

  if (!name || !description || !imageUrl || !userId) {
    return res.status(200).json("please enter all required fields");
  }
  try {
    const org = await Organization.create({
      name,
      description,
      imageUrl,
      userId,
    });

    return res
      .status(201)
      .json({ message: "Orginization created successfully", org: org });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong please try again later");
  }
};
