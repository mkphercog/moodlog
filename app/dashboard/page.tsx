import { Dashboard, Login, Main } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mood.log · Dashboard",
};

const DashboardPage = () => {
  const isAuthenticated = true;

  return <Main>{isAuthenticated ? <Dashboard /> : <Login />}</Main>;
};
export default DashboardPage;
