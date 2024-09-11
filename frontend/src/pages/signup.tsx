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
import { Link, useNavigate } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  async function handleClick(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        {
          email,
          password,
          name,
          avatar: avatars[current],
        },
      );

      if (res.status === 200 && res.data.message === "Sign up successfully!") {
        navigate("/signin");
      } else {
        setError(res.data);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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

          <form onSubmit={handleClick} className="flex flex-col gap-5">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="uppercase ">
              {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm">
            No account?{" "}
            <Link to={"/signin"} className=" ml-2 font-semibold">
              Sign In
            </Link>
          </p>
          {/* TODO: Replace error message with toast */}
          <p className="text-red-500 text-[12px] font-semibold">{error}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
