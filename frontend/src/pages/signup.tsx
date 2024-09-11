import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
const avatars = [
  "/avatar1.jpg",
  "/avatar2.jpg",
  "/avatar3.jpg",
  "/avatar4.jpg",
];

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  function handleClick() {
    console.log(email, password);
  }
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  console.log(current);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sign Up</CardTitle>
          <CardDescription>Create new account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 min-w-[300px] md:min-w-[400px]">
          <Carousel setApi={setApi} className="max-w-[250px] md:max-w-[400px]">
            <CarouselContent>
              {avatars.map((avatar) => {
                return (
                  <CarouselItem className="cursor-pointer group">
                    <img
                      src={avatar}
                      className=" h-[150px] md:h-[200px] object-contain w-full  rounded-lg"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} className="uppercase ">
            Sign Up
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            No account?{" "}
            <Link to={"/signin"} className=" ml-2 font-semibold">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
