import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderRoot, Plus, Search } from "lucide-react";

export const ProjectDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-5 flex flex-col gap-10">
      {/* Topbar of project daashboard */}

      <div className="flex items-center justify-between">
        <div className="flex bg-white items-center gap-2 p-1 border rounded-lg w-[300px] justify-between ">
          <input className="p-2 flex-1 focus-within:outline-none bg-transparent" />
          <Search className="text-orange-500" />
        </div>
        <Button className="flex items-center gap-4">
          <Plus />
          <p className="uppercase">New Task</p>
        </Button>
      </div>

      {/* sort and progress section of daashboard */}

      <div className="flex items-center justify-between">
        <div className=" w-[300px] flex items-center gap-4">
          <FolderRoot className="text-orange-500" />
          <div className="flex flex-col flex-1 gap-2">
            <p className="font-semibold text-gray-600 text-xl ">Project name</p>
            <Progress value={33} />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A-Z">Order A-Z</SelectItem>
            <SelectItem value="Z-A">Order Z-A</SelectItem>
            <SelectItem value="Newest">Newest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
