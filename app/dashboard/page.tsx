import { Dashboard, Main } from "@/components";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Mood.log · Dashboard",
};

const DashboardPage: FC<PropsWithChildren> = () => {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
};
export default DashboardPage;
