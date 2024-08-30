"use client";

import { SECONDARY_FONT } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";

export const HeroTitle = () => {
  const { currentColors } = useUiColors();

  const gradientColors = {
    "--gradient-dark-color": currentColors[7],
    "--gradient-light-color": currentColors[4],
  };

  return (
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
  );
};
