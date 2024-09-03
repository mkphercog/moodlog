import { EmojiVariantType, ErrorMessagesType, MoodItemType } from "@/types";
import { Nerko_One, Nunito } from "next/font/google";

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

export const MOODS_LIST: MoodItemType[] = [
  {
    id: "mood_1",
    scaleValue: 1,
    name: "@$#%&*!",
    emoji: "😡",
    animatedEmojiVariant: "angry",
  },
  {
    id: "mood_2",
    scaleValue: 2,
    name: "Unhappy",
    emoji: "😢",
    animatedEmojiVariant: "cry",
  },
  {
    id: "mood_3",
    scaleValue: 3,
    name: "Slightly unhappy",
    emoji: "😞",
    animatedEmojiVariant: "sad",
  },
  {
    id: "mood_4",
    scaleValue: 4,
    name: "Neutral",
    emoji: "😐",
    animatedEmojiVariant: "neutral-face",
  },
  {
    id: "mood_5",
    scaleValue: 5,
    name: "Slightly happy",
    emoji: "😌",
    animatedEmojiVariant: "relieved",
  },
  {
    id: "mood_6",
    scaleValue: 6,
    name: "Happy",
    emoji: "😀",
    animatedEmojiVariant: "smile",
  },
  {
    id: "mood_7",
    scaleValue: 7,
    name: "Excellent mood",
    emoji: "🤩",
    animatedEmojiVariant: "star-face",
  },
];

export const EMOJI_VARIANT_NAMES_LIST: EmojiVariantType[] = [
  "angry-symbols",
  "angry",
  "cool",
  "cry",
  "grinning",
  "heart-eyes",
  "heart-face",
  "laughing",
  "loud-cry",
  "monocle",
  "neutral-face",
  "no-mouth",
  "party-face",
  "pleading",
  "relieved",
  "sad",
  "smile",
  "star-face",
];

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
export const USER_NAME_MAX_LENGTH = 15;

export const COLORS: Record<string, string[]> = {
  indigo: [
    "#eef2ff", //0 - 50
    "#e0e7ff", //1 - 100
    "#c7d2fe", //2 - 200
    "#a5b4fc", //3 - 300
    "#818cf8", //4 - 400
    "#6366f1", //5 - 500
    "#4f46e5", //6 - 600
    "#4338ca", //7 - 700
    "#3730a3", //8 - 800
    "#312e81", //9 - 900
    "#1e1b4b", //10 - 950
  ],
  blue: [
    "#eff6ff",
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
    "#1e3a8a",
    "#172554",
  ],
  sky: [
    "#f0f9ff",
    "#e0f2fe",
    "#bae6fd",
    "#7dd3fc",
    "#38bdf8",
    "#0ea5e9",
    "#0284c7",
    "#0369a1",
    "#075985",
    "#0c4a6e",
    "#082f49",
  ],
  emerald: [
    "#ecfdf5",
    "#d1fae5",
    "#a7f3d0",
    "#6ee7b7",
    "#34d399",
    "#10b981",
    "#059669",
    "#047857",
    "#065f46",
    "#064e3b",
    "#022c22",
  ],
  green: [
    "#f0fdf4",
    "#dcfce7",
    "#bbf7d0",
    "#86efac",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#166534",
    "#14532d",
    "#052e16",
  ],
  lime: [
    "#f7fee7",
    "#ecfccb",
    "#d9f99d",
    "#bef264",
    "#a3e635",
    "#84cc16",
    "#65a30d",
    "#4d7c0f",
    "#3f6212",
    "#365314",
    "#1a2e05",
  ],
  amber: [
    "#fffbeb",
    "#fef3c7",
    "#fde68a",
    "#fcd34d",
    "#fbbf24",
    "#f59e0b",
    "#d97706",
    "#b45309",
    "#92400e",
    "#78350f",
    "#451a03",
  ],
  yellow: [
    "#fefce8",
    "#fef9c3",
    "#fef08a",
    "#fde047",
    "#facc15",
    "#eab308",
    "#ca8a04",
    "#a16207",
    "#854d0e",
    "#713f12",
    "#422006",
  ],
  fuchsia: [
    "#fdf4ff",
    "#fae8ff",
    "#f5d0fe",
    "#f0abfc",
    "#e879f9",
    "#d946ef",
    "#c026d3",
    "#a21caf",
    "#86198f",
    "#701a75",
    "#4a044e",
  ],
  pink: [
    "#fdf2f8",
    "#fce7f3",
    "#fbcfe8",
    "#f9a8d4",
    "#f472b6",
    "#ec4899",
    "#db2777",
    "#be185d",
    "#9d174d",
    "#831843",
    "#500724",
  ],
};

export const LANDING_PAGE_MOODS: Record<string, number> = {
  "0": 2,
  "1": 5,
  "2": 7,
  "3": 1,
  "4": 3,
  "5": 2,
  "6": 7,
  "7": 1,
  "8": 5,
  "9": 3,
  "10": 2,
  "11": 4,
  "12": 1,
  "13": 3,
  "14": 5,
  "15": 2,
  "16": 6,
  "17": 1,
  "18": 3,
  "19": 6,
  "20": 2,
  "21": 4,
  "22": 1,
  "23": 7,
  "24": 5,
  "25": 3,
  "26": 4,
  "27": 2,
  "28": 1,
  "29": 2,
  "30": 6,
  "31": 1,
  "32": 3,
  "33": 5,
  "34": 2,
  "35": 7,
  "36": 1,
  "37": 5,
  "38": 3,
  "39": 2,
  "40": 5,
  "41": 6,
  "42": 1,
  "43": 3,
};
