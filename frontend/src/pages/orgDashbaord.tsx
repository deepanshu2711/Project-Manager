import { ProjectsSection } from "@/components/Orgs/ProjectsSection";
import { Button } from "@/components/ui/button";
import { Organization } from "@/types";
import axios from "axios";
import { Dot, LoaderCircle, Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleImageUpload } from "@/util/uploadImage";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  useEffect(() => {
    if (orgDetails) {
      setImageUrl(orgDetails?.imageUrl);
      setname(orgDetails.name);
      setDescription(orgDetails.description);
    }
  }, [orgDetails?.imageUrl, orgDetails]);

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

  const handleLeaveOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const responce = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/org/leave?orgId=${orgId}&userId=${user?._id}`,
      );

      if (responce.status === 200) {
        console.log(responce.data);
        dispatch(removeOrganization(orgId));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const SelectedFile = e.target.files?.[0];
    if (SelectedFile) {
      setUploading(true);
      const result = await handleImageUpload(SelectedFile);
      if (result.success) {
        setImageUrl(result.downloadUrl as string);
      }
      setUploading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(true);
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/org/edit`,
        {
          name,
          description,
          imageUrl,
          orgId,
        },
      );

      if (responce.status === 200) {
        console.log(status);
        setOrgDetails({
          ...(orgDetails as Organization),
          name: name,
          description: description,
          imageUrl: imageUrl,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenEdit(false);
      setEditing(false);
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
                <DialogTitle>Edit</DialogTitle>
                <DialogDescription>
                  Edit the organization details such as Name, Description, Image
                  etc.
                </DialogDescription>
                <form
                  onSubmit={handleEdit}
                  className="flex flex-col gap-5 items-center"
                >
                  <Input
                    ref={inputRef}
                    onChange={handleFileChange}
                    type="file"
                    className="hidden"
                  />
                  <div
                    onClick={handleEditImageClick}
                    className="relative group cursor-pointer"
                  >
                    {uploading ? (
                      <LoaderCircle className="animate-spin m-[80px]" />
                    ) : (
                      <div>
                        <img
                          src={imageUrl}
                          className="h-[150px] w-[150px] rounded-lg mt-5"
                        />
                        <div className="absolute hidden group-hover:block top-0 bottom-0 left-0 right-0 bg-black rounded-lg opacity-50 mt-5" />
                        <div className="absolute hidden group-hover:block top-[40%] p-2 border-2 rounded-full  left-[30%] border-white">
                          <Pencil className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <Input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    placeholder="Name"
                  />
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows={5}
                  />
                  <Button type="submit" className="w-full uppercase">
                    {editing ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </form>
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
        <div className="md:h-[80px] justify-end flex p-5">
          <Button onClick={handleLeaveOrg} variant={"destructive"}>
            Leave
          </Button>
        </div>
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
