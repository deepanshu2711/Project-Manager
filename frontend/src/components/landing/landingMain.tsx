import { Button } from "../ui/button";

export const LandingMain = () => {
  return (
    <div>
      <div className="p-5 h-[80vh] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-5 items-center">
          <p className=" text-3xl font-bold">
            Project Master: Streamline Your Team’s{" "}
            <span className="text-orange-500">Success</span>
          </p>
          <p className="text-gray-500 max-w-2xl text-center">
            Project Master is your ultimate solution for managing projects and
            tasks efficiently within organizations. Whether you're joining an
            existing organization or creating a new one, our platform empowers
            teams to collaborate seamlessly.
          </p>
          <Button>Get started</Button>
        </div>

        {/* Image section */}
      </div>
      <div className="mb-20 p-5">
        <div className="relative border-[15px] md:border-[20px] rounded-sm border-black/5">
          <img
            src="/landing-page-image.png"
            className=" bg-black/5 rounded-sm "
          />
        </div>
      </div>
    </div>
  );
};
