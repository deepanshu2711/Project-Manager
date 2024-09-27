import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileCheck2,
  FolderRoot,
  Pencil,
  Plus,
  Repeat2,
  Search,
  Trash,
} from "lucide-react";
import { useState } from "react";

export const ProjectDashboard = () => {
  const [selectedTasks, setSelectedTasks] = useState<"OnGoing" | "Completed">(
    "OnGoing",
  );
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

      {/* Task Card  */}

      <div className="m-10 flex flex-col gap-10">
        <div className="flex items-center gap-10">
          <div
            className={`flex items-center gap-2 cursor-pointer ${selectedTasks === "Completed" && "opacity-40"}`}
            onClick={() => setSelectedTasks("OnGoing")}
          >
            <p
              className={`font-bold text-gray-500  ${selectedTasks === "OnGoing" && "text-orange-500"}`}
            >
              On Going Tasks
            </p>
            <p
              className={`px-2 rounded-sm ${selectedTasks === "OnGoing" ? "bg-orange-500" : "bg-gray-500"}  text-white`}
            >
              1
            </p>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer ${selectedTasks === "OnGoing" && "opacity-40"}`}
            onClick={() => setSelectedTasks("Completed")}
          >
            <p
              className={`font-bold text-gray-500  ${selectedTasks === "Completed" && "text-orange-500"}`}
            >
              Completed Tasks
            </p>
            <p
              className={`px-2 rounded-sm ${selectedTasks === "Completed" ? "bg-orange-500" : "bg-gray-500"}  text-white`}
            >
              1
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-10">
            <Checkbox />
            <div className="flex items-center justify-between p-5 bg-white flex-1 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/10 p-2 rounded-lg max-w-fit flex flex-col items-center justify-center">
                  <FileCheck2 className="text-orange-500" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[16px]">New task</p>
                  <p className="text-[12px] text-gray-500 font-semibold">
                    Description
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="text-gray-500 flex items-center gap-2">
                  <Repeat2 />
                  <p className="text-[14px] font-semibold text-gray-500">
                    In progress
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-orange-500 bg-orange-500/10 p-2 rounded-lg cursor-pointer flex items-center justify-center">
                    <Pencil />
                  </div>
                  <div className="text-gray-500 bg-gray-500/10 p-2 rounded-lg flex items-center cursor-pointer justify-center">
                    <Trash />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
