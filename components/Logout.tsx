"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/Button";

export const Logout = () => {
  const { currentUser, logOut } = useAuth();

  if (!currentUser) return;

  return (
    <div className="flex gap-1 items-center">
      <p className={`text-xs sm:text-sm font-bold`}>{currentUser.email}</p>
      <Button variant="outline" onClick={async () => await logOut()}>
        Logout
      </Button>
    </div>
  );
};
