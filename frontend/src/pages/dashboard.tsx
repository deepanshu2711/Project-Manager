import { MainSidebar } from "@/components/MainSidebar/MainSidebar";
import { useUser } from "@/providers/userProvider";

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <MainSidebar userOrgs={user?.orgs} user={user} />
    </div>
  );
};
