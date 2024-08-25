"use client";

import Link from "next/link";
import { Button } from "./Button";
import { useAuth } from "@/context/AuthContext";

export const CallToAction = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="w-full max-w-[600px] mx-auto">
        <Link href={"/dashboard"}>
          <Button variant="dark" full>
            Go to dashboard
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={"/dashboard"}>
        <Button>Sign Up</Button>
      </Link>
      <Link href={"/dashboard"}>
        <Button variant="dark">Login</Button>
      </Link>
    </div>
  );
};
