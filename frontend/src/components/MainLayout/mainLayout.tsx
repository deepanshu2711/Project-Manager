import React from "react";
import { MainSidebar } from "@/components/MainSidebar/MainSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const orgs = useSelector((state: RootState) => state.organization.org);
  return (
    <div className="flex items-start">
      <MainSidebar userOrgs={orgs} user={user} />
      <div className="md:ml-[10vh] flex-1">{children}</div>
    </div>
  );
};
