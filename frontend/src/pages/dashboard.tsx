export const Dashboard = () => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center h-screen p-5">
      <img
        src="/empty-dashboard.png"
        className="md:w-[80vh] w-[50vh] h-[50vh] md:h-[80vh]"
      />
      <div className="flex flex-col gap-2">
        <p className="text-2xl text-orange-500">Welcome to the Dashboard!</p>
        <p className="font-semibold text-gray-500 max-w-md ">
          You can start by creating a new organization or continue with an
          existing one. Choose the option that best fits your needs.
        </p>
      </div>
    </div>
  );
};
