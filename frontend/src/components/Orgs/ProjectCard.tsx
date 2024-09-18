import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderRoot, Info, MoreVertical, Trash } from "lucide-react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  projectId: string;
  orgId: string;
  name: string;
  handleDelete: (projectId: string) => void;
}
export const ProjectCard = ({
  name,
  projectId,
  orgId,
  handleDelete,
}: ProjectCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-5">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <FolderRoot className="text-orange-500" />
              <div>
                <Link
                  to={`${orgId}/project/${projectId}`}
                  className="text-xl hover:text-orange-500 cursor-pointer font-bold text-gray-600"
                >
                  {name}
                </Link>
                <p className="text-gray-400 font-semibold text-[14px]">
                  33 Members
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleDelete(projectId)}
                  className="flex group items-center justify-between cursor-pointer"
                >
                  <Trash className="group-hover:text-rose-500" />
                  <p className="font-semibold group-hover:text-rose-500">
                    Delete
                  </p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[180px] flex flex-col gap-1">
        <Link to={`/org/${orgId}/project/${projectId}`}>
          <Separator className="mb-5" />
          {/* <div className="flex items-start gap-2"> */}
          {/*   <Dot className="absolute" /> */}
          {/*   <p className="text-gray-500 font-semibold ml-8"> */}
          {/*     Research paint colors for living room */}
          {/*   </p> */}
          {/* </div> */}
          {/* <div className="flex items-start gap-2"> */}
          {/*   <Dot className="absolute" /> */}
          {/*   <p className="text-gray-500 font-semibold ml-8"> */}
          {/*     Purchase new furniture */}
          {/*   </p> */}
          {/* </div> */}
          {/* <div className="flex items-start gap-2"> */}
          {/*   <Dot className="absolute" /> */}
          {/*   <p className="text-gray-500 font-semibold ml-8"> */}
          {/*     Install new lightning feature */}
          {/*   </p> */}
          {/* </div> */}
          <div className="flex items-center justify-center w-full h-full">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="mt-8">
                    <Info className=" text-gray-400 h-10 w-10 hover:text-orange-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add some tasks to get started!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Progress value={33} />
        <div className="flex items-center justify-between w-full">
          <p className="text-gray-400 text-[14px] font-semibold">On Progress</p>
          <p className="text-gray-400 font-semibold text-[14px]">33%</p>
        </div>
      </CardFooter>
    </Card>
  );
};
