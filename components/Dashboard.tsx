"use client";

import { Login, DashboardStats } from "./";
import { Calendar, Loading } from "./ui";
import { useAuth } from "@/context/AuthContext";
import { DashboardChooseMood } from "./DashboardChooseMood";

export const Dashboard = () => {
  const { currentUser, userMoodsData, loading } = useAuth();

  if (loading) {
    return <Loading size="lg" />;
  }

  if (!currentUser || !currentUser.emailVerified) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <DashboardStats data={userMoodsData} />
      <DashboardChooseMood />
      <Calendar />
    </div>
  );
};
