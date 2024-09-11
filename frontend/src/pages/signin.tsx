import { useState } from "react";
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

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleClick() {
    console.log(email, password);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 min-w-[300px] md:min-w-[400px]">
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
            Sign In
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            No account?{" "}
            <Link to={"/signup"} className=" ml-2 font-semibold">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
