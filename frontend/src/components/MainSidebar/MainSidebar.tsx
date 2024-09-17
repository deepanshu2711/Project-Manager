import { FileUp, LoaderCircle, LogOut, Plus } from "lucide-react";
import { SiTicktick } from "react-icons/si";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Organization, User } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useRef, useState } from "react";
import axios from "axios";
import { handleImageUpload } from "@/util/uploadImage";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addOrganization } from "@/redux/reducers/orgSlice";
interface MainSidebarProps {
  userOrgs: Organization[] | null;
  user: User | null;
}
export const MainSidebar = ({ userOrgs, user }: MainSidebarProps) => {
  console.log(userOrgs);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openCreateOrg, setOpenCreateOrg] = useState<boolean>(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const SelectedFile = event.target.files?.[0];
    if (SelectedFile) {
      setUploading(true);
      const result = await handleImageUpload(SelectedFile);
      if (result.success) {
        setImageUrl(result.downloadUrl as string);
      }
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/org/create`,
        {
          name,
          description,
          imageUrl,
          userId: user?._id,
        },
      );

      if (responce.status === 201) {
        console.log(responce.data);
        dispatch(addOrganization(responce.data.org));
      } else {
        setError(responce.data);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong please try again later");
    } finally {
      setLoading(false);
      setOpenCreateOrg(false);
    }
  };

  const handleLogout = async () => {
    try {
      const responce = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {
          withCredentials: true,
        },
      );

      if (responce.status === 200) {
        return navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed md:flex hidden top-0 bottom-0 left-0 h-screen border p-2  flex-col gap-5 ">
      <Link to={"/"} className="flex items-center justify-center mt-2">
        <SiTicktick className="text-orange-500 h-10 w-10  self-center" />
      </Link>
      <Separator />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <Dialog
              open={openCreateOrg}
              onOpenChange={() => setOpenCreateOrg(!openCreateOrg)}
            >
              <DialogTrigger>
                <div className="p-3 bg-gray-100 cursor-pointer border-2 border-gray-100  hover:text-white hover:bg-orange-500 rounded-full">
                  <Plus />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-orange-500">
                    Create Organization
                  </DialogTitle>
                </DialogHeader>
                <Card className=" max-w-[350px] md:max-w-[500px] border-0 shadow-white">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                    >
                      {uploading ? (
                        <LoaderCircle className="animate-spin h-[50px] w-[50px] m-[75px] self-center" />
                      ) : imageUrl ? (
                        <img
                          src={imageUrl}
                          className=" h-[150px] w-[150px] md:h-[200px] md:w-[200px] rounded-lg self-center"
                        />
                      ) : (
                        <div
                          onClick={handleFileClick}
                          className="flex flex-col p-[40px] group hover:border-orange-300 cursor-pointer rounded-lg items-center border justify-center"
                        >
                          <FileUp className="h-20 w-20 text-gray-500 group-hover:text-orange-500" />
                        </div>
                      )}
                      <Input
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        type="file"
                        hidden
                        className="hidden"
                      />
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        required
                      />
                      <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Description"
                        required
                      />
                      <Button type="submit" className="uppercase">
                        {loading ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </form>
                    <CardFooter>
                      <p className="text-red-500 font-semibold">{error}</p>
                    </CardFooter>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create Organization</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className=" flex flex-1 flex-col items-center  gap-1 ">
        {userOrgs &&
          userOrgs.length > 0 &&
          userOrgs.map((org) => (
            <Link to={`/org/${org._id}`}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className="flex items-center">
                    {params.orgId === org._id && (
                      <div className="w-[6px] left-0 absolute h-12 rounded-full bg-orange-400" />
                    )}
                    <img
                      id={org._id}
                      src={org.imageUrl}
                      className="h-12 w-12 self-center rounded-lg border-2 border-gray-200"
                      alt={org.name}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="">
                    <p>{org.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          ))}
      </div>
      <Separator />
      <div className="flex flex-col items-center gap-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <img
                src={user?.avatar}
                className="h-12 w-12 self-center rounded-full border-2 border-gray-200"
                alt={user?.name}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{user?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={handleLogout}
                className="p-3 bg-gray-100 cursor-pointer border-2 border-gray-100  hover:text-white hover:bg-gray-300 rounded-full"
              >
                <LogOut />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-white border text-black">
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
