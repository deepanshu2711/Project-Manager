import express from "express";
import {
  AddMembers,
  createOrg,
  deleteOrg,
  getOrgDetails,
  removeMember,
} from "../controllers/org";

export const orgRouter = express.Router();
orgRouter.post("/create", createOrg);
orgRouter.get("/:orgId", getOrgDetails);
orgRouter.post("/addMembers", AddMembers);
orgRouter.delete("/removeMember", removeMember);
orgRouter.delete("/delete/:orgId", deleteOrg);
