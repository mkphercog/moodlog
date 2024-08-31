"use client";

import { EMOJI_VARIANT_NAMES_LIST, SECONDARY_FONT } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";
import { AnimatedEmoji } from "./ui";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const getRandomEmojiIndex = () =>
  Math.floor(Math.random() * EMOJI_VARIANT_NAMES_LIST.length);

export const HeroTitle = () => {
  const [emojiIndex, setEmojiIndex] = useState(getRandomEmojiIndex());
  const { currentUser } = useAuth();
  const { currentColors } = useUiColors();

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiIndex((stateIndex) => {
        if (stateIndex >= EMOJI_VARIANT_NAMES_LIST.length - 1) {
          return 0;
        }

        return (stateIndex += 1);
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
      <AnimatedEmoji
        canAnimate
        emojiVariant={EMOJI_VARIANT_NAMES_LIST[emojiIndex]}
        className="mx-auto mt-10 !w-44 !h-44 sm:!w-52 sm:!h-52"
      />
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
