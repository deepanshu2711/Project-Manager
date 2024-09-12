import React from "react";
import { MainSidebar } from "@/components/MainSidebar/MainSidebar";
import { useUser } from "@/providers/userProvider";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <div className="flex items-start">
      <MainSidebar userOrgs={user?.orgs} user={user} />
      <div className="ml-[10vh] flex-1">{children}</div>
    </div>
  );
};
