import { useUser } from "@/providers/userProvider";

export const Dashboard = () => {
  const { user } = useUser();
  return (
    <div>
      <p>Dashbaord</p>
      <p>Welocome {user?.name}</p>
    </div>
  );
};
