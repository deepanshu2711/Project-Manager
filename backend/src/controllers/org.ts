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

// export const getUserOrgs = async (req: Request, res: Response) => {
//   const { userId } = req.params;
//
//   if (!userId) {
//     return res.status(200).json("userId is required");
//   }
//
//   try {
//     const user = await User.findById({ _id: userId });
//     return res.json
//   } catch (error) {
//     console.log("Something went wrong please try again later");
//   }
// };
