import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import { Project, User } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";

interface ProjectsSectionProps {
  orgId: string;
  projects: Project[] | undefined;
}

export const ProjectsSection = ({ orgId, projects }: ProjectsSectionProps) => {
  const [activetab, setActivetab] = useState<"Projects" | "Members">(
    "Projects",
  );

  const [members, setMembers] = useState<User[]>([]);
  const [openAddNewProject, setOpenAddNewProject] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDesc, setProjectDesc] = useState<string>("");

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(projectDesc, projectName, orgId);
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/project/create`,
        {
          name: projectName,
          description: projectDesc,
          orgId,
        },
      );

      if (responce.status === 201) {
        console.log(responce.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenAddNewProject(false);
      setProjectName("");
      setProjectDesc("");
    }
  };

  return (
    <div className="mt-10 p-5 flex flex-col bg-zinc-50">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-5 md:gap-10">
          <div
            onClick={() => setActivetab("Projects")}
            className="flex flex-col gap-1 cursor-pointer "
          >
            <p
              className={` text-lg md:text-xl font-semibold md:px-5 text-gray-400 ${activetab === "Projects" && "text-gray-700"}`}
            >
              Projects
            </p>
            <div
              className={`h-[4px] rounded-lg w-full  ${activetab === "Projects" ? "bg-orange-500" : "bg-zinc-50"}`}
            />
          </div>
          <div
            onClick={() => setActivetab("Members")}
            className="flex flex-col gap-1 cursor-pointer "
          >
            <p
              className={`text-lg md:text-xl font-semibold md:px-5 text-gray-400 ${activetab === "Members" && "text-gray-700"}`}
            >
              Members
            </p>

            <div
              className={`h-[4px] rounded-lg w-full  ${activetab === "Members" ? "bg-orange-500" : "bg-zinc-50"}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        {activetab === "Projects" && (
          <>
            <div className="md:flex hidden items-center justify-between">
              <p className="text-3xl text-gray-600 font-semibold mr-[2px]">
                All <span className="text-orange-500">Projects</span>
              </p>
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
              <Dialog
                open={openAddNewProject}
                onOpenChange={() => setOpenAddNewProject(!openAddNewProject)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant={"default"}
                    className="self-end"
                    onClick={() => setOpenAddNewProject(true)}
                  >
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                    <DialogDescription>
                      Add a new project in your organization.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={handleCreateProject}
                    className="flex flex-col gap-4"
                  >
                    <Input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      type="text"
                      placeholder="Name"
                    />
                    <Textarea
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      placeholder="Short description"
                      rows={5}
                    />
                    <Button type="submit" className="uppercase">
                      Create
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex md:hidden flex-col gap-4">
              <p className="text-xl text-gray-600 font-semibold">
                All <span className="text-orange-500">Projects</span>
              </p>
              <div className="flex items-center gap-5">
                <Select>
                  <SelectTrigger className="w-full  flex-1">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="flex-1">
                    <SelectItem value="A-Z">Order A-Z</SelectItem>
                    <SelectItem value="Z-A">Order Z-A</SelectItem>
                    <SelectItem value="Newest">Newest</SelectItem>
                    <SelectItem value="Oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setOpenAddNewProject(true)}
                  variant={"outline"}
                  className="flex-1 border-orange-500"
                >
                  Add Project
                </Button>
              </div>
            </div>
          </>
        )}
        {activetab === "Members" && (
          <>
            <div className="md:flex hidden items-center justify-between">
              <p className="text-3xl text-gray-600 font-semibold">
                All <span className="text-orange-500">Members</span>
              </p>
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
              <Button className="border-orange-500">Add Members</Button>
            </div>
            <div className="flex md:hidden flex-col gap-4">
              <p className="text-xl text-gray-600 font-semibold">
                All <span className="text-orange-500">Members</span>
              </p>
              <div className="flex items-center gap-5">
                <Select>
                  <SelectTrigger className="w-full  flex-1">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="flex-1">
                    <SelectItem value="A-Z">Order A-Z</SelectItem>
                    <SelectItem value="Z-A">Order Z-A</SelectItem>
                    <SelectItem value="Newest">Newest</SelectItem>
                    <SelectItem value="Oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant={"outline"}
                  className="flex-1 border-orange-500"
                >
                  Add Members
                </Button>
              </div>
            </div>
          </>
        )}
        {activetab === "Projects" && (projects?.length as number) > 0 && (
          <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        )}
      </div>

      {activetab === "Projects" && projects?.length === 0 && (
        <div className="flex items-center justify-center mt-10 h-[50vh]">
          <div className="flex items-center gap-10">
            <img
              src="/empty.svg"
              className="md:h-[300px] md:w-[300px] h-[100px] w-[100px]"
            />
            <div className=" flex flex-col gap-1 max-w-[500px]">
              <p className="text-xl text-orange-500 font-semibold">Empty</p>
              <p className="text-[14px] md:block hidden font-semibold text-gray-400">
                You don't have any projects in your organization. Please add at
                least one project to get started.
              </p>
            </div>
          </div>
        </div>
      )}
      {activetab === "Members" && members.length === 0 && (
        <div className="flex items-center justify-center mt-10 h-[50vh]">
          <div className="flex items-center gap-10">
            <img
              src="/empty.svg"
              className="md:h-[300px] md:w-[300px] h-[100px] w-[100px]"
            />
            <div className=" flex flex-col gap-1 max-w-[500px]">
              <p className="text-xl text-orange-500 font-semibold">
                No Members
              </p>
              <p className="text-[14px] md:block hidden font-semibold text-gray-400">
                You don't have any members in your organization. Please invite
                members to get started.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
