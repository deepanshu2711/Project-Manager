import { Request, Response } from "express";
import { Organization } from "../models/org";
import { User } from "../models/user";

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

    await User.findOneAndUpdate({ _id: userId }, { $push: { orgs: org._id } });

    return res
      .status(201)
      .json({ message: "Orginization created successfully", org: org });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong please try again later");
  }
};

export const getOrgDetails = async (req: Request, res: Response) => {
  const { orgId } = req.params;
  try {
    const org = await Organization.findById({ _id: orgId })
      .populate("projects")
      .populate("members");

    if (!orgId) {
      return res.status(404).json("Org does not exists");
    }

    return res.json(org).status(200);
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong please try again later").status(500);
  }
};

export const AddMembers = async (req: Request, res: Response) => {
  const { members, orgId } = req.body;
  if (!members || !orgId) {
    return res.status(400).json("Missing information");
  }

  try {
    if (members.length === 0) {
      return res.status(200).json("No valid email addresses provided");
    }

    const users = await User.find({ email: { $in: members } });
    if (users?.length === 0) {
      return res
        .status(200)
        .json("No users found with the provided email addresses");
    }
    const userIds = users.map((user) => user._id);

    await Organization.findOneAndUpdate(
      { _id: orgId },
      { $addToSet: { members: { $each: userIds } } },
    );

    return res
      .status(201)
      .json(`${userIds.length} members added to Organization`);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something went wrong please try again later");
  }
};
