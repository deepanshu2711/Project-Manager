import { MainSidebar } from "@/components/MainSidebar/MainSidebar";
import { useUser } from "@/providers/userProvider";

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="flex items-start">
      <MainSidebar userOrgs={user?.orgs} user={user} />
      {/* <div className="ml-[10vh] flex-1 relative "> */}
      {/*   <img src="/demo-org.jpg" className="h-[40vh] w-[100%] object-cover" /> */}
      {/*   <img */}
      {/*     src="/demo-org.jpg" */}
      {/*     className=" h-[120px] w-[120px] md:h-[200px] md:w-[200px] absolute -bottom-[60px] md:-bottom-[100px] rounded-lg left-5 border-4 boeder-gray-600" */}
      {/*   /> */}
      {/* </div> */}
    </div>
  );
};
