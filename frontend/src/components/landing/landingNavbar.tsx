import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { SiTicktick } from "react-icons/si";

export const LandingNavabar = () => {
  return (
    <div className="flex  items-center justify-between p-5">
      <div className="flex items-center gap-2">
        <SiTicktick className="text-orange-600 h-6 w-6 mt-1.5" />
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500 font-bold text-2xl">Project</span>{" "}
          Master
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <Button>
          <Link to={"/signin"}>Sign In</Link>
        </Button>
        <Button variant={"outline"}>
          <Link to={"/signup"}>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};
