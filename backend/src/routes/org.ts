import express from "express";
import {
  AddMembers,
  createOrg,
  deleteOrg,
  EditOrg,
  getOrgDetails,
  leaveOrg,
  removeMember,
} from "../controllers/org";

export const orgRouter = express.Router();

orgRouter.post("/create", createOrg);
orgRouter.get("/:orgId", getOrgDetails);
orgRouter.post("/addMembers", AddMembers);
orgRouter.delete("/removeMember", removeMember);
orgRouter.delete("/delete/:orgId", deleteOrg);
orgRouter.delete("/leave", leaveOrg);
orgRouter.post("/edit", EditOrg);
