"use client";

import { useEffect, useState } from "react";
import { EMOJI_VARIANT_NAMES_LIST } from "@/constants";
import { getRandomEmojiIndex } from "@/utils";
import { AnimatedEmoji } from "./ui";

const HeroEmoji = () => {
  const [emojiIndex, setEmojiIndex] = useState(0);

  useEffect(() => {
    setEmojiIndex(getRandomEmojiIndex());

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

  return (
    <AnimatedEmoji
      canAnimate
      emojiVariant={EMOJI_VARIANT_NAMES_LIST[emojiIndex]}
      className="!w-full !h-full"
    />
  );
};

export default HeroEmoji;
