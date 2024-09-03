"use client";

export const getClockNum = (num: number) => (num < 10 ? `0${num}` : num);

export const getRedirectUrl = () => {
  const isDevEnv = !!process && process.env.NODE_ENV === "development";

  if (isDevEnv) {
    return window.location.origin;
  } else {
    return "https://moodlog-mh.netlify.app";
  }
};
