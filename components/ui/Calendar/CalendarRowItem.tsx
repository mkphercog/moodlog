import { FC } from "react";
import { GRADIENTS, LANDING_PAGE_MOODS, MONTHS_LIST, MOODS } from "@/constants";
import { useCalendar } from "./CalendarContext";

type CalendarRowItemProps = {
  dayNumber: number;
};

export const CalendarRowItem: FC<CalendarRowItemProps> = ({ dayNumber }) => {
  const { isLandingPage, userData, now, selectedMonth, selectedYear } =
    useCalendar();

  const isToday =
    dayNumber === now.day &&
    selectedMonth === MONTHS_LIST[now.month] &&
    selectedYear === now.year;

  const bgColor = isLandingPage
    ? GRADIENTS.green[LANDING_PAGE_MOODS[dayNumber] + 2]
    : dayNumber in userData
    ? GRADIENTS.green[userData[dayNumber] + 2]
    : "white";
  const textColor = bgColor === "white" ? "text-green-500" : "text-white";
  const borderColor = isToday ? "border-green-950" : "border-transparent";

  const demoMoodSymbol =
    dayNumber in LANDING_PAGE_MOODS
      ? Object.values(MOODS)[LANDING_PAGE_MOODS[dayNumber] - 1]
      : "";

  const userMoopdSymbol =
    dayNumber in userData ? Object.values(MOODS)[userData[dayNumber] - 1] : "";

  return (
    <div
      style={{ background: bgColor }}
      className={`
       flex items-center gap-1 sm:gap-2 justify-between 
       px-1 py-2 sm:p-2
       rounded-lg border-2 calendarShadow
       text-xs sm:text-sm font-bold
       ${borderColor} ${textColor}
     `}
    >
      <p>{dayNumber}</p>
      <p>{isLandingPage ? demoMoodSymbol : userMoopdSymbol}</p>
    </div>
  );
};
