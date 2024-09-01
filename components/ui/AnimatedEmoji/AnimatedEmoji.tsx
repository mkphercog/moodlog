"use client";

import {
  angrySymbolsAnimation,
  angryAnimation,
  coolAnimation,
  cryAnimation,
  grinningAnimation,
  heartEyesAnimation,
  heartFaceAnimation,
  laughingAnimation,
  loudCryAnimation,
  monocleAnimation,
  neutralFaceAnimation,
  noMouthAnimation,
  partyFaceAnimation,
  pleadingAnimation,
  relievedAnimation,
  sadAnimation,
  smileAnimation,
  starFaceAnimation,
} from "./animations";

import { memo, useState, useEffect, Suspense, FC, useRef, lazy } from "react";
import { Loading } from "../Loading";
import { EmojiVariantType } from "@/types";
import { LottieRefCurrentProps } from "lottie-react";

const Lottie = lazy(() => import("lottie-react"));

interface AnimatedEmojiProps {
  emojiVariant: EmojiVariantType;
  [key: string]: any;
  style?: any;
  className?: string;
  canAnimate: boolean;
}
const TYPES_OF_EMOJI: Record<EmojiVariantType, unknown> = {
  "angry-symbols": angrySymbolsAnimation,
  angry: angryAnimation,
  cool: coolAnimation,
  cry: cryAnimation,
  grinning: grinningAnimation,
  "heart-eyes": heartEyesAnimation,
  "heart-face": heartFaceAnimation,
  laughing: laughingAnimation,
  "loud-cry": loudCryAnimation,
  monocle: monocleAnimation,
  "neutral-face": neutralFaceAnimation,
  "no-mouth": noMouthAnimation,
  "party-face": partyFaceAnimation,
  pleading: pleadingAnimation,
  relieved: relievedAnimation,
  sad: sadAnimation,
  smile: smileAnimation,
  "star-face": starFaceAnimation,
};

const emojiSize = "w-[100px] h-[100px]";

const AnimatedEmojiComponent: FC<AnimatedEmojiProps> = ({
  emojiVariant,
  style,
  className,
  canAnimate,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const emojiRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!emojiRef.current) return;

    if (canAnimate) {
      emojiRef.current.play();
    } else {
      emojiRef.current.stop();
    }
  }, [canAnimate]);

  const FallbackLoader = () => (
    <div
      className={`flex items-center justify-center ${emojiSize} ${className}`}
    >
      <Loading />
    </div>
  );

  // case of window not defined
  if (!isMounted) return <FallbackLoader />;

  return (
    <Suspense fallback={<FallbackLoader />}>
      <Lottie
        lottieRef={emojiRef}
        autoplay={canAnimate}
        className={`${emojiSize} ${className}`}
        animationData={TYPES_OF_EMOJI[emojiVariant]}
        style={style}
        {...props}
      />
    </Suspense>
  );
};

export const AnimatedEmoji = memo(AnimatedEmojiComponent);
