import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { ProjectCard } from "./ProjectCard";

export const ProjectsSection = () => {
  return (
    <div className="mt-10 p-5 flex flex-col bg-zinc-50">
      <div className="md:flex hidden items-center justify-between">
        <p className="text-3xl text-gray-600 font-semibold">
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
        <Button variant={"outline"} className="border-orange-500">
          Create New Project
        </Button>
      </div>
      <div className="flex md:hidden flex-col gap-4">
        <p className="text-xl text-gray-600 font-semibold">
          All <span className="text-orange-500">Projects</span>
        </p>
        <div className="flex items-center gap-5">
          <Select>
            <SelectTrigger className="w-full flex-1">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="flex-1">
              <SelectItem value="A-Z">Order A-Z</SelectItem>
              <SelectItem value="Z-A">Order Z-A</SelectItem>
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={"outline"} className="flex-1 border-orange-500">
            Create Project
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};
