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
