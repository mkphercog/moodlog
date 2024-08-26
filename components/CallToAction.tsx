"use client";

import Link from "next/link";
import { Button } from "./ui";
import { useAuth } from "@/context/AuthContext";
import { SECONDARY_FONT } from "@/constants";
import { Loading } from "./Loading";

export const CallToAction = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (currentUser) {
    return (
      <div className="w-full max-w-[600px] mx-auto">
        <Link href={"/dashboard"}>
          <Button
            className={`text-lg sm:text-xl md:text-2xl ${SECONDARY_FONT.className}`}
            variant="dark"
            full
          >
            Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={"/dashboard?mode=register"}>
        <Button
          className={`text-lg sm:text-xl md:text-2xl ${SECONDARY_FONT.className}`}
        >
          Sign Up
        </Button>
      </Link>
      <Link href={"/dashboard?mode=login"}>
        <Button
          className={`text-lg sm:text-xl md:text-2xl ${SECONDARY_FONT.className}`}
          variant="dark"
        >
          Login
        </Button>
      </Link>
    </div>
  );
};
