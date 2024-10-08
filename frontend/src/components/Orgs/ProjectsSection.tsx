import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { ProjectCard } from "./ProjectCard";
import { useEffect, useState } from "react";
import { Organization, Project, User } from "@/types";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle, UserRoundX } from "lucide-react";

interface ProjectsSectionProps {
  orgId: string;
  projects: Project[] | undefined;
  members: User[] | undefined;
  user: User | null;
  orgDetails: Organization | null;
}

export const ProjectsSection = ({
  orgId,
  projects,
  members,
  user,
  orgDetails,
}: ProjectsSectionProps) => {
  const [activetab, setActivetab] = useState<"Projects" | "Members">(
    "Projects",
  );

  const [emails, setEmails] = useState<string>("");
  const [openAddNewProject, setOpenAddNewProject] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDesc, setProjectDesc] = useState<string>("");
  const [creatingProject, setCreatingProject] = useState<boolean>(false);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [allMembers, setAllMembers] = useState<User[]>([]);
  const [openAddMembers, setOpenAddMembers] = useState<boolean>(false);
  const [addingMembers, setAddingMembers] = useState<boolean>(false);
  const [filter, setFilter] = useState<"A-Z" | "Z-A" | "Newest" | "Oldest">(
    "A-Z",
  );
  const [memberFilter, setMemberFilter] = useState<
    "A-Z" | "Z-A" | "Newest" | "Oldest"
  >("A-Z");

  useEffect(() => {
    if (projects) {
      setAllProjects(projects);
    }

    if (members) {
      setAllMembers(members);
    }
  }, [projects, members]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingProject(true);
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/project/create`,
        {
          name: projectName,
          description: projectDesc,
          orgId,
        },
        {
          withCredentials: true,
        },
      );

      if (responce.status === 201) {
        console.log(responce.data);
        setAllProjects([...allProjects, responce.data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreatingProject(false);
      setOpenAddNewProject(false);
      setProjectName("");
      setProjectDesc("");
    }
  };

  async function deleteProject(projectId: string) {
    try {
      const responce = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/project/delete?orgId=${orgId}&projectId=${projectId}`,
      );

      if (responce.status === 200) {
        const FilteredProjects = allProjects.filter(
          (project) => project._id !== projectId,
        );
        setAllProjects(FilteredProjects);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    if (orgDetails?.userId === user?._id) {
      try {
        const responce = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/org/removeMember?orgId=${orgId}&memberId=${memberId}`,
        );

        if (responce.status === 200) {
          const filteredMembers = allMembers.filter(
            (member) => member._id !== memberId,
          );
          setAllMembers(filteredMembers);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("You don't have permission to perform this action");
    }
  };

  async function handleAddMembers(e: React.FormEvent) {
    e.preventDefault();
    const allEmails = emails.split(/[\s,;]+/).map((email) => email.trim());
    try {
      setAddingMembers(true);
      const responce = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/org/addMembers`,
        {
          orgId: orgId,
          members: allEmails,
        },
      );
      if (responce.status === 201) {
        console.log("Responce after adding", responce.data.members);
        const addedMembers = responce.data.members;
        setAllMembers((prevMembers) => [...prevMembers, ...addedMembers]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAddingMembers(false);
      setOpenAddMembers(false);
      setEmails("");
    }
  }

  useEffect(() => {
    const sortedData = [...allProjects];
    if (filter === "Z-A") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filter === "A-Z") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "Newest") {
      sortedData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (filter === "Oldest") {
      sortedData.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
    setAllProjects(sortedData);
  }, [filter]);

  useEffect(() => {
    const sortedData = [...allMembers];
    if (filter === "Z-A") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filter === "A-Z") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }
    setAllMembers(sortedData);
  }, [filter]);

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
              <Select
                value={filter}
                onValueChange={(value) =>
                  setFilter(value as "A-Z" | "Z-A" | "Newest" | "Oldest")
                }
              >
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
              {orgDetails?.userId === user?._id && (
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
                      Add New Project
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
                        {creatingProject ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
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
              <Select
                value={memberFilter}
                onValueChange={(value) =>
                  setMemberFilter(value as "A-Z" | "Z-A" | "Newest" | "Oldest")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A-Z">Order A-Z</SelectItem>
                  <SelectItem value="Z-A">Order Z-A</SelectItem>
                </SelectContent>
              </Select>
              {orgDetails?.userId === user?._id && (
                <Dialog
                  open={openAddMembers}
                  onOpenChange={() => setOpenAddMembers(!openAddMembers)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant={"default"}
                      onClick={() => setOpenAddMembers(true)}
                    >
                      Add Members
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Add members to your Organization
                      </DialogTitle>
                      <DialogDescription>
                        Enter the email addresses of the members you want to
                        add, separated by commas and spaces.
                        <br />
                        <span>
                          Example: email1@example.com, email2@example.com
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleAddMembers}
                      className="flex flex-col gap-5"
                    >
                      <Textarea
                        rows={8}
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                      />
                      <Button type="submit" className="uppercase w-full">
                        {addingMembers ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          "Add"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
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
        {activetab === "Projects" && (allProjects?.length as number) > 0 && (
          <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
            {allProjects?.map((project) => (
              <ProjectCard
                handleDelete={deleteProject}
                projectId={project._id}
                name={project.name}
                orgId={orgId}
              />
            ))}
          </div>
        )}
      </div>

      {activetab === "Projects" && allProjects?.length === 0 && (
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
      {activetab === "Members" && allMembers.length === 0 && (
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

      {activetab === "Members" && allMembers && allMembers?.length > 0 && (
        <div className=" mt-10">
          <Table>
            <TableCaption>
              A list of all members in your organization
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead className="w-[100px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allMembers.map((member, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell className="flex items-end justify-end">
                    <UserRoundX
                      onClick={() => handleRemoveMember(member._id)}
                      className="cursor-pointer  h-7 w-7  hover:text-orange-500"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
