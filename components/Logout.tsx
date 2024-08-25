"use client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./Button";

export const Logout = () => {
  const { currentUser, logOut } = useAuth();

  if (!currentUser) return;

  return (
    <Button variant="outline" onClick={logOut}>
      Logout
    </Button>
  );
};
