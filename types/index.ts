export type ErrorMessagesType =
  | "exists"
  | "incorrect"
  | "password"
  | "email"
  | "empty"
  | "verification"
  | "none";

export type StatusesType = {
  total_days: number;
  average_mood: string;
  time_remaining: string;
};

export type EmojiVariantType =
  | "angry-symbols"
  | "angry"
  | "cool"
  | "cry"
  | "grinning"
  | "heart-eyes"
  | "heart-face"
  | "laughing"
  | "loud-cry"
  | "monocle"
  | "neutral-face"
  | "no-mouth"
  | "party-face"
  | "pleading"
  | "relieved"
  | "sad"
  | "smile"
  | "star-face";

export type MoodItemType = {
  id: string;
  scaleValue: number;
  name: string;
  emoji: string;
  animatedEmojiVariant: EmojiVariantType;
};

export type ColorNameType =
  | "indigo"
  | "blue"
  | "sky"
  | "emerald"
  | "green"
  | "lime"
  | "amber"
  | "yellow"
  | "fuchsia"
  | "pink";

export type UserDbDayType = {
  scaleValue: number;
};

export type UserDbDataType = {
  settings: {
    nextDateChangeUserName: number;
    uiColor: ColorNameType;
  };
  moods: {
    [year: string]: {
      [month: string]: {
        [day: string]: UserDbDayType;
      };
    };
  };
};
