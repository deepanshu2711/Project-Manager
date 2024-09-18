import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileCheck2, FolderRoot, Folders } from "lucide-react";
import { SiTicktick } from "react-icons/si";

export const LandingMain = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user !== null) {
      return navigate("/dashboard");
    } else {
      return navigate("/signin");
    }
  };
  return (
    <div>
      <div className="p-5 h-[80vh] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-5 items-center">
          <p className=" text-3xl md:text-7xl font-bold text-center">
            Project Master: Streamline Your Team’s{" "}
            <span className="text-orange-500">Success</span>
          </p>
          <p className="text-gray-500 max-w-2xl text-center">
            Project Master is your ultimate solution for managing projects and
            tasks efficiently within organizations. Whether you're joining an
            existing organization or creating a new one, our platform empowers
            teams to collaborate seamlessly.
          </p>
          <Button onClick={handleClick}>Get started</Button>
        </div>

        {/* Image section */}
      </div>
      <div className="mb-5 p-5 relative">
        <div className="relative border-[15px] md:border-[20px] rounded-sm border-black/5">
          <img
            src="/landing-page-image.png"
            className=" bg-black/5 rounded-lg border-[10px] border-white shadow-lg "
          />
        </div>
        <div className=" hidden md:block h-[180px] bg-white blur-2xl w-full absolute bottom-0" />
        <div className="  hidden md:block h-[180px] bg-white blur-2xl w-full absolute bottom-0" />
        <div className="  hidden md:block h-[180px] bg-white blur-2xl w-full absolute bottom-0" />
        <div className="  hidden md:block h-[100px] bg-white blur-2xl w-full absolute bottom-0" />
      </div>
      <div className="flex items-center flex-col justify-center gap-10 mb-20 p-5">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl md:text-4xl font-bold text-center">
            Streamline Your{" "}
            <span className="text-orange-500">Team’s Workflow</span>
          </p>
          <p className=" text-[16px] md:text-lg text-center text-gray-500 ">
            Manage your organizations, projects, and tasks all in one platform,
            designed to enhance collaboration and productivity.
          </p>
        </div>
        <div className="grid grid-cols-1 p-5 md:grid-cols-3 gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-500 text-xl flex items-center justify-between">
                Organizations
                <Folders />
              </CardTitle>

              <CardDescription>Manage Your Organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Easily create, join, or manage organizations to streamline your
                team's workflow. Our platform empowers organizations to
                collaborate effectively.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant={"secondary"}>Explore</Button>
            </CardFooter>
          </Card>
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-orange-500 text-xl flex items-center justify-between">
                Projects
                <FolderRoot className="text-orange-500" />
              </CardTitle>
              <CardDescription>
                <p>Create Projects</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Start new projects in just a few clicks and assign team members
                and Assign tasks to them and communicate directly within the
                project
              </p>
            </CardContent>
            <CardFooter className="flex justify-end items-end absolute bottom-0 right-0">
              <Button variant={"secondary"}>Explore</Button>
            </CardFooter>
          </Card>
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-orange-500 text-xl flex items-center justify-between">
                Tasks
                <FileCheck2 />
              </CardTitle>
              <CardDescription>Task Management Simplified</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Stay on top of your tasks with detailed tracking, easy
                assignments, and timely reminders. Share task details, attach
                relevant files.
              </p>
            </CardContent>
            <CardFooter className="flex justify-end absolute bottom-0 right-0">
              <Button variant={"secondary"}>Explore</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {/* footer section */}
      <div className="flex md:flex-row flex-col items-center md:items-start justify-between gap-10 p-5 ">
        <div className="flex items-s flex-col gap-4 md:mt-10">
          <div className="flex items-center gap-2">
            <SiTicktick className="text-orange-600 h-6 w-6 mt-1.5" />
            <h1 className="text-2xl font-bold">
              <span className="text-orange-500 font-bold text-2xl">
                Project
              </span>{" "}
              Master
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] text-gray-500">Copyright © 2024</p>
            <p className="text-[14px] text-gray-500">All rights reserved</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-20 md:mt-10">
          <div className="flex flex-col gap-5">
            <p className="text-gray-500 text-[14px]">Pricing</p>
            <p className="text-gray-500  text-[14px]">BLog</p>
            <p className="text-gray-500  text-[14px]">Contact</p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-gray-500  text-[14px]">Privacy Policy</p>
            <p className="text-gray-500  text-[14px]">Terms of Service</p>
            <p className="text-gray-500  text-[14px]">Refund Policy</p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-gray-500  text-[14px]">Twitter</p>
            <p className="text-gray-500  text-[14px]">Linkedin</p>
            <p className="text-gray-500  text-[14px]">GitHub</p>
          </div>
        </div>
      </div>
      <div className=" hidden lg:block relative my-20">
        <div className=" hidden md:block h-[100px] bg-white blur-2xl w-full absolute top-0" />
        <p className="text-[140px] text-black/20 text-center font-bold uppercase">
          Project Master
        </p>
      </div>
    </div>
  );
};
