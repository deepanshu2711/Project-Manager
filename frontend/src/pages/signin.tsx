import React, { useState } from "react";
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
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { useUser } from "@/providers/userProvider";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { setUser } = useUser();
  async function handleClick(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      if (res.status == 201) {
        navigate("/createorg");
        setUser(res.data.user);
      } else {
        setError(res.data);
      }

      console.log(res.data);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 min-w-[300px] md:min-w-[400px]">
          <form onSubmit={handleClick} className="flex flex-col gap-5">
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
              {loading ? <LoaderCircle className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-sm">
            No account?{" "}
            <Link to={"/signup"} className=" ml-2 font-semibold">
              Sign up
            </Link>
          </p>
          {/* TODO: Replace error message with toast */}
          <p className="text-red-500 text-[12px] font-semibold">{error}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
