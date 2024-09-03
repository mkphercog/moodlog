import type { Metadata } from "next";
import { PRIMARY_FONT } from "@/constants";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Head } from "./head";
import { Header } from "@/components/Header";
import { UiColorsProvider } from "@/context/ColorsContext";
import { Footer } from "@/components/Footer";

import "./globals.css";
import { CurrentDateProvider } from "@/context/CurrentDateContext";

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
    <html lang="en" translate="no">
      <Head />
      <AuthProvider>
        <CurrentDateProvider>
          <UiColorsProvider>
            <body
              className={`w-full text-sm sm:text-base min-h-screen flex flex-col items-center text-slate-800 ${PRIMARY_FONT.className}`}
            >
              <div className="w-full max-w-[1200px] min-h-screen flex flex-col">
                <Header />
                {children}

                <Footer />
                <Toaster />
              </div>
            </body>
          </UiColorsProvider>
        </CurrentDateProvider>
      </AuthProvider>
    </html>
  );
}
