"use client";

import { APP_VERSION, SECONDARY_FONT } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";
import Link from "next/link";

export const Footer = () => {
  const { currentColors } = useUiColors();

  return (
    <footer className="grid place-items-center p-4 sm:p-8">
      <p
        style={{ color: currentColors[5] }}
        className={`${SECONDARY_FONT.className}`}
      >
        Created by{" "}
        <Link
          style={{
            "--text-color": currentColors[5],
            "--text-hover-color": currentColors[4],
          }}
          className="duration-300 textColors"
          href={"https://marcin-hercog.netlify.app/"}
          target="_blank"
        >
          Marcin Hercog
        </Link>
      </p>
      <p
        style={{ color: currentColors[5] }}
        className="text-xs"
      >{`version ${APP_VERSION}`}</p>
    </footer>
  );
};
