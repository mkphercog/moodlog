import type { Metadata } from "next";
import Link from "next/link";
import { SECONDARY_FONT, PRIMARY_FONT } from "@/constants";
import { AuthProvider } from "@/context/AuthContext";
import { Logout } from "@/components";
import { Head } from "./head";

import "./globals.css";

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
          className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${PRIMARY_FONT.className}`}
        >
          <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
            <Link href={"/"}>
              <h1
                className={`text-xl sm:text-2xl textGradient ${SECONDARY_FONT.className}`}
              >
                Mood.log()
              </h1>
            </Link>
            <Logout />
          </header>
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
        </body>
      </AuthProvider>
    </html>
  );
}
