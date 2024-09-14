import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dot, FolderRoot } from "lucide-react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  projectId: string;
  orgId: string;
  name: string;
}
export const ProjectCard = ({ name, projectId, orgId }: ProjectCardProps) => {
  return (
    <Link to={`/org/${orgId}/project/${projectId}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-5">
            <FolderRoot className="text-orange-500" />
            <div>
              <p className="text-xl font-bold text-gray-600">{name}</p>
              <p className="text-gray-400 font-semibold text-[14px]">
                33 Members
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[180px] flex flex-col gap-1">
          <Separator className="mb-5" />
          <div className="flex items-start gap-2">
            <Dot className="absolute" />
            <p className="text-gray-500 font-semibold ml-8">
              Research paint colors for living room
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Dot className="absolute" />
            <p className="text-gray-500 font-semibold ml-8">
              Purchase new furniture
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Dot className="absolute" />
            <p className="text-gray-500 font-semibold ml-8">
              Install new lightning feature
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Progress value={33} />
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-400 text-[14px] font-semibold">
              On Progress
            </p>
            <p className="text-gray-400 font-semibold text-[14px]">33%</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
