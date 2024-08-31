"use client";

import { useAuth } from "@/context/AuthContext";
import { Settings } from "./Settings";
import Link from "next/link";
import { SECONDARY_FONT } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const { currentColors } = useUiColors();

  const userName = currentUser?.displayName;

  if (pathname !== "/dashboard") return null;

  return (
    <header className="px-4 py-3 sm:px-8 sm:py-6 flex items-center justify-between gap-4 sticky top-0 bg-white z-50">
      <Link href={"/"}>
        <h1
          style={{
            "--gradient-dark-color": currentColors[7],
            "--gradient-light-color": currentColors[4],
          }}
          className={`text-xl sm:text-2xl textGradient ${SECONDARY_FONT.className}`}
        >
          Mood.log()
        </h1>
      </Link>

      {currentUser && (
        <div className="flex gap-3 items-center">
          <p className={`text-xs sm:text-sm font-bold`}>
            {userName ? `Hi, ${userName}!` : currentUser.email}
          </p>
          <Settings />
        </div>
      )}
    </header>
  );
};
