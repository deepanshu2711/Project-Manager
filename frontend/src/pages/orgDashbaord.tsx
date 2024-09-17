import { ProjectsSection } from "@/components/Orgs/ProjectsSection";
import { Button } from "@/components/ui/button";
import { Organization } from "@/types";
import axios from "axios";
import { Dot, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { removeOrganization } from "@/redux/reducers/orgSlice";
import { RootState } from "@/redux/store";

export const OrgDashboard = () => {
  const params = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const [orgDetails, setOrgDetails] = useState<Organization | null>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [orgId, setOrgId] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrgdetails = async () => {
      const responce = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/org/${params.orgId}`,
      );
      if (responce.status === 200) {
        setOrgDetails(responce.data);
        console.log(responce.data);
      }
    };
    fetchOrgdetails();
  }, [params.orgId]);

  useEffect(() => {
    if (params.orgId) {
      setOrgId(params.orgId);
    }
  }, [params.orgId]);

  const handleDeleteOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleting(true);
    try {
      const responce = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/org/delete/${orgId}`,
      );
      if (responce.status === 200) {
        navigate("/dashboard");
        dispatch(removeOrganization(orgId));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="relative -z-10">
        {/* <img */}
        {/*   src={orgDetails?.imageUrl} */}
        {/*   className="h-[40vh] w-[100%] object-cover" */}
        {/* /> */}
        <div className="h-[40vh] bg-orange-400 w-[100%] object-cover" />
        <img
          src={orgDetails?.imageUrl}
          className=" h-[120px] w-[120px] md:h-[200px] md:w-[200px] absolute -bottom-[60px] md:-bottom-[100px] rounded-lg left-5 border-4 boeder-gray-600"
        />
      </div>
      {orgDetails?.userId === user?._id ? (
        <div className="md:flex hidden gap-4  items-end justify-end p-5">
          <Dialog open={openEdit} onOpenChange={() => setOpenEdit(!openEdit)}>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="self-end"
                onClick={() => setOpenEdit(true)}
              >
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add members to your Organization</DialogTitle>
                <DialogDescription>
                  Enter the email addresses of the members you want to add,
                  separated by commas and spaces.
                  <br />
                  <span>Example: email1@example.com, email2@example.com</span>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openDelete}
            onOpenChange={() => setOpenDelete(!openDelete)}
          >
            <DialogTrigger asChild>
              <Button
                variant={"destructive"}
                className="self-end"
                onClick={() => setOpenDelete(true)}
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Organization</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Once deleted, the organization
                  and its associated data will be permanently removed.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-4 justify-end">
                <Button onClick={handleDeleteOrg} variant={"outline"}>
                  {deleting ? <LoaderCircle className="animate-spin" /> : "ok"}
                </Button>
                <Button onClick={() => setOpenDelete(false)}>cancel</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className=" hidden md:block md:h-[80px]" />
      )}
      <div className="md:hidden flex  items-end justify-end p-5">
        {orgDetails?.userId === user?._id && (
          <Button className="self-end">Edit</Button>
        )}
      </div>
      <div className="md:mt-5 p-5 max-w-4xl flex flex-col gap-1">
        <h2 className="font-bold text-3xl text-gray-700">{orgDetails?.name}</h2>
        <div className="flex items-center gap-2 mt-4">
          <Dot className="absolute" />
          <p className="text-gray-400 ml-8">
            {/* TODO: populate user form userID and handle createdAt */}
            Created By <span>Deepanshu saini</span> on <span>12-09-2024</span>
          </p>
        </div>
        <div className="flex items-center relative gap-2">
          <Dot className="absolute" />
          <p className="text-gray-700 font-normal ml-8">
            {orgDetails?.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dot className="absolute" />
          {/* TODO:make member count dynamic */}
          <p className="text-gray-500 ml-8">
            Team headcount: <span>11</span>
          </p>
        </div>
      </div>
      <ProjectsSection
        members={orgDetails?.members}
        orgId={orgId}
        projects={orgDetails?.projects}
      />
    </div>
  );
};
