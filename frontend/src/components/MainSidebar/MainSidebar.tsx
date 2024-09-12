import { LogOut, Plus } from "lucide-react";
import { SiTicktick } from "react-icons/si";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Organization, User } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MainSidebarProps {
  userOrgs: Organization[] | undefined;
  user: User | null;
}
export const MainSidebar = ({ userOrgs, user }: MainSidebarProps) => {
  console.log(userOrgs);
  return (
    <div className="fixed top-0 bottom-0 left-0 h-screen border p-2 flex flex-col gap-5 ">
      <Link to={"/"} className="flex items-center justify-center mt-2">
        <SiTicktick className="text-orange-500 h-10 w-10  self-center" />
      </Link>
      <Separator />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <div className="p-3 bg-gray-100 cursor-pointer border-2 border-gray-100  hover:text-white hover:bg-orange-500 rounded-full">
              <Plus />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create Organization</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className=" flex flex-1 flex-col items-center gap-4 ">
        {userOrgs &&
          userOrgs.length > 0 &&
          userOrgs.map((org) => (
            <Link to={`/org/${org._id}`}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      id={org._id}
                      src={org.imageUrl}
                      className="h-12 w-12 self-center rounded-lg border-2 border-gray-200"
                      alt={org.name}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right">
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
              <div className="p-3 bg-gray-100 cursor-pointer border-2 border-gray-100  hover:text-white hover:bg-orange-500 rounded-full">
                <LogOut />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
