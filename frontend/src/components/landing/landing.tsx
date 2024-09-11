import { LandingMain } from "./landingMain";
import { LandingNavabar } from "./landingNavbar";

export const Landing = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <LandingNavabar />
      <LandingMain />
    </div>
  );
};
