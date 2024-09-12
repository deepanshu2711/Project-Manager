import express from "express";
import { createOrg, getOrgDetails } from "../controllers/org";

export const orgRouter = express.Router();
orgRouter.post("/create", createOrg);
orgRouter.get("/:orgId", getOrgDetails);
