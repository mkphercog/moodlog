import { ErrorMessagesType } from "@/types";
import { Nerko_One, Nunito } from "next/font/google";

export const PRIMARY_FONT = Nunito({ subsets: ["latin"], weight: ["400"] });
export const SECONDARY_FONT = Nerko_One({
  subsets: ["latin"],
  weight: ["400"],
});

export const MOODS = {
  "@$#%&*!": "😡",
  sad: "😢",
  existing: "😶",
  good: "😊",
  excellent: "😍",
};

export const DAY_LIST = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

export const MONTHS_LIST = Object.keys(MONTHS);

export const ERROR_MESSAGES: Record<ErrorMessagesType, string | null> = {
  exists: "This email exists in database. Log in to the app.",
  incorrect: "Inccorect data. Try again.",
  verification:
    "Verify your email address by clicking on the link sent to the email address you provided during registration.",
  password: "Password must be 6 characters long.",
  email: "Email is incorrect: example@example.com.",
  empty: "Complete all fields.",
  none: null,
};

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const USER_NAME_MAX_LENGTH = 10;

export const GRADIENTS: Record<string, string[]> = {
  indigo: [
    "#dcd6ff",
    "#b8adff",
    "#9285ff",
    "#7766ff",
    "#4833ff",
    "#3525db",
    "#261ab1",
    "#1a1093",
    "#10097a",
  ],
  green: [
    "#dcfdc3",
    "#affc9d",
    "#7cf86c",
    "#4bf246",
    "#0cea1c",
    "#0dc928",
    "#0ca82f",
    "#038731",
    "#047031",
  ],
  blue: [
    "#ccfffa",
    "#9afefe",
    "#66f1fc",
    "#41dffa",
    "#07c2f7",
    "#0497d4",
    "#0171b1",
    "#02518e",
    "#003a76",
  ],
  yellow: [
    "#fff8db",
    "#fff0b8",
    "#ffe495",
    "#ffd97b",
    "#ffc84f",
    "#dba339",
    "#b78127",
    "#936118",
    "#7a4b10",
  ],
  pink: [
    "#ffd8f2",
    "#ffb1ea",
    "#ff8aea",
    "#ff6df1",
    "#ff3dfe",
    "#cd2ddb",
    "#9d1fb7",
    "#731493",
    "#540b7a",
  ],
};

export const LANDING_PAGE_MOODS: Record<string, number> = {
  "0": 2,
  "1": 5,
  "2": 4,
  "3": 1,
  "4": 3,
  "5": 2,
  "6": 4,
  "7": 1,
  "8": 5,
  "9": 3,
  "10": 2,
  "11": 4,
  "12": 1,
  "13": 3,
  "14": 5,
  "15": 2,
  "16": 4,
  "17": 1,
  "18": 3,
  "19": 5,
  "20": 2,
  "21": 4,
  "22": 1,
  "23": 3,
  "24": 5,
  "25": 3,
  "26": 4,
  "27": 2,
  "28": 1,
  "29": 2,
  "30": 4,
  "31": 1,
  "32": 3,
  "33": 5,
  "34": 2,
  "35": 4,
  "36": 1,
  "37": 5,
  "38": 3,
  "39": 2,
  "40": 5,
  "41": 4,
  "42": 1,
  "43": 3,
};
