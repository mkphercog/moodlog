import { Dashboard, Main } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mood.log() · Dashboard",
};

const DashboardPage = () => {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
};
export default DashboardPage;
