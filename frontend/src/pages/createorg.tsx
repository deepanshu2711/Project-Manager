import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addOrganization } from "@/redux/reducers/orgSlice";
import { RootState } from "@/redux/store";
import { handleImageUpload } from "@/util/uploadImage";
import axios from "axios";
import { FileUp, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CreateOrg = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if ((user?.orgs.length as number) > 0) {
      return navigate("/dashboard");
    }
  }, [user, navigate]);

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
        navigate("/dashboard");
        dispatch(addOrganization(responce.data.org));
      } else {
        setError(responce.data);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className=" max-w-[350px] md:max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-orange-500 text-lg">
            Create Organization
            {user?.name}
          </CardTitle>
          <CardDescription>
            Establish a new organization to start managing projects, teams, and
            tasks effectively. Set up your organization with essential details
            and begin collaborating with your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
              {loading ? <LoaderCircle className="animate-spin" /> : "Create"}
            </Button>
          </form>
          <CardFooter>
            <p className="text-red-500 font-semibold">{error}</p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
