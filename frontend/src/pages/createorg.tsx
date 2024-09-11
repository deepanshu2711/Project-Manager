import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { handleImageUpload } from "@/util/uploadImage";
import { FileUp, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";

export const CreateOrg = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = () => {
    console.log(name, description, imageUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className=" max-w-[350px] md:max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-orange-500 text-lg">
            Create Organization
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
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
