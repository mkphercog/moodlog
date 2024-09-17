"use client";

import { useUiColors } from "@/context/ColorsContext";
import { useAuth } from "@/context/AuthContext";
import { SECONDARY_FONT } from "@/constants";
import { HeroEmoji } from "./HeroEmoji";

export const HeroTitle = () => {
  const { currentUser } = useAuth();
  const { currentColors } = useUiColors();

  const gradientColors = {
    "--gradient-dark-color": currentColors[7],
    "--gradient-light-color": currentColors[4],
  };

  return (
    <section>
      <h1
        className={`text-5xl sm:text-6xl md:text-7xl !leading-[initial] text-center ${SECONDARY_FONT.className}`}
      >
        <span style={gradientColors} className="textGradient">
          Mood.log()
        </span>{" "}
        helps you track your{" "}
        <span style={gradientColors} className="textGradient">
          daily
        </span>{" "}
        mood!
      </h1>

      <div className="flex items-center justify-center mx-auto mt-10 !w-44 !h-44 sm:!w-52 sm:!h-52">
        <HeroEmoji />
      </div>

      {currentUser?.displayName && (
        <h3
          className={`mt-10 text-4xl sm:text-5xl !leading-[initial] text-center ${SECONDARY_FONT.className}`}
        >
          Hi,{" "}
          <span style={gradientColors} className="textGradient">
            {currentUser?.displayName}
          </span>
          !
        </h3>
      )}
    </section>
  );
};
