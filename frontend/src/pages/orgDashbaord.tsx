import { ProjectsSection } from "@/components/Orgs/ProjectsSection";
import { Button } from "@/components/ui/button";
import { Organization } from "@/types";
import axios from "axios";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const OrgDashboard = () => {
  const params = useParams();
  const [orgDetails, setOrgDetails] = useState<Organization | null>(null);

  useEffect(() => {
    const fetchOrgdetails = async () => {
      const responce = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/org/${params.orgId}`,
      );
      if (responce.status === 200) {
        setOrgDetails(responce.data);
      }
    };
    fetchOrgdetails();
  }, [params.orgId]);

  console.log("OrgDetails:", orgDetails);

  return (
    <div className="flex flex-col ">
      <div className="relative -z-10">
        <img src="/demo-org.jpg" className="h-[40vh] w-[100%] object-cover" />
        <img
          src="/demo-org.jpg"
          className=" h-[120px] w-[120px] md:h-[200px] md:w-[200px] absolute -bottom-[60px] md:-bottom-[100px] rounded-lg left-5 border-4 boeder-gray-600"
        />
      </div>
      <div className="md:flex hidden  items-end justify-end p-5">
        <Button className="self-end">Edit Organization Details</Button>
      </div>
      <div className="md:hidden flex  items-end justify-end p-5">
        <Button className="self-end">Edit</Button>
      </div>
      <div className="md:mt-5 p-5 max-w-4xl flex flex-col gap-1">
        <h2 className="font-bold text-3xl text-gray-700">{orgDetails?.name}</h2>
        <div className="flex items-center gap-2 mt-4">
          <Dot className="absolute" />
          <p className="text-gray-400 ml-8">
            {/* TODO: populate user form userID and handle createdAt */}
            Created By <span>Deepanshu saini</span> on <span>12-09-2024</span>
          </p>
        </div>
        <div className="flex items-center relative gap-2">
          <Dot className="absolute" />
          <p className="text-gray-700 font-normal ml-8">
            {orgDetails?.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dot className="absolute" />
          {/* TODO:make member count dynamic */}
          <p className="text-gray-500 ml-8">
            Team headcount: <span>11</span>
          </p>
        </div>
      </div>
      <ProjectsSection />
    </div>
  );
};
