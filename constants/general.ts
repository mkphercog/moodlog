import packageJson from "@/package.json";
import { ErrorMessagesType } from "@/types";
import { Nerko_One, Nunito } from "next/font/google";

export const APP_VERSION = packageJson.version;

export const PRIMARY_FONT = Nunito({
  subsets: ["latin"],
  weight: ["400"],
  preload: false,
});

export const SECONDARY_FONT = Nerko_One({
  subsets: ["latin"],
  weight: ["400"],
  preload: false,
});

export const ERROR_MESSAGES: Record<ErrorMessagesType, string | null> = {
  exists: "This email exists in database. Log in to the app.",
  incorrect: "Inccorect data. Try again.",
  verification:
    "Verify your email address by clicking on the link sent to the email address you provided during registration. If you don't see the email, make sure to check your spam folder.",
  password: "Password must be 6 characters long.",
  email: "Email is incorrect: example@example.com.",
  empty: "Complete all fields.",
  none: null,
};

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const USER_NAME_MAX_LENGTH = 15;
