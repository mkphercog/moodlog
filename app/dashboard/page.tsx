import { Main } from "@/components/ui";
import { Dashboard } from "@/components/Dashboard";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Mood.log() · Dashboard",
};

const DashboardPage = () => {
  return (
    <Main>
      <Suspense>
        <Dashboard />
      </Suspense>
    </Main>
  );
};
export default DashboardPage;
