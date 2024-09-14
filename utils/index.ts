"use client";

import { EMOJI_VARIANT_NAMES_LIST, MONTHS } from "@/constants";

export const getClockNum = (num: number) => (num < 10 ? `0${num}` : num);

export const getRedirectUrl = () => {
  const isDevEnv = !!process && process.env.NODE_ENV === "development";

  if (isDevEnv) {
    return window.location.origin;
  } else {
    return "https://moodlog-mh.netlify.app";
  }
};

export const getMonthById = (id: number) => {
  return MONTHS.find((month) => month.id === id) || MONTHS[0];
};

export const getRandomEmojiIndex = () => {
  return Math.floor(Math.random() * EMOJI_VARIANT_NAMES_LIST.length);
};
