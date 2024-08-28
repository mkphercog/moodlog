import type { Metadata } from "next";
import Link from "next/link";
import { SECONDARY_FONT, PRIMARY_FONT } from "@/constants";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Logout } from "@/components/Logout";
import { Head } from "./head";

import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Mood.log()",
  description: "Track your daily mood!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={`w-full text-sm sm:text-base min-h-screen flex flex-col items-center text-slate-800 ${PRIMARY_FONT.className}`}
        >
          <div className="w-full max-w-[1200px] min-h-screen flex flex-col">
            <Header />
            {children}
            <footer className="p-4 sm:p-8 grid place-items-center">
              <p className={`text-green-500 ${SECONDARY_FONT.className}`}>
                Created by{" "}
                <Link
                  className=" duration-300 hover:text-green-400"
                  href={"https://marcin-hercog.netlify.app/"}
                  target="_blank"
                >
                  Marcin Hercog
                </Link>{" "}
                ❤️‍🔥
              </p>
            </footer>
            <Toaster />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
