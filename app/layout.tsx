import type { Metadata } from "next";
import "./globals.css";
import { FUGAZ_FONT, OPENSANS_FONT } from "@/constants";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import { Head } from "./head";
import { Logout } from "@/components";

export const metadata: Metadata = {
  title: "Mood.log",
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
          className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${OPENSANS_FONT.className}`}
        >
          <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
            <Link href={"/"}>
              <h1
                className={`text-base sm:text-lg textGradient ${FUGAZ_FONT.className}`}
              >
                Mood.log()
              </h1>
            </Link>
            <Logout />
          </header>
          {children}
          <footer className="p-4 sm:p-8 grid place-items-center">
            <p className={`text-indigo-500 ${FUGAZ_FONT.className}`}>
              Created with ❤️‍🔥
            </p>
          </footer>
        </body>
      </AuthProvider>
    </html>
  );
}
