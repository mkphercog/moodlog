import { FC } from "react";
import {
  DAY_LIST,
  LANDING_PAGE_MOODS,
  MONTHS_LIST,
  MOODS_LIST,
} from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCalendar } from "./CalendarContext";
import { useUiColors } from "@/context/ColorsContext";
import { MoodItemType } from "@/types";

type CalendarRowItemProps = {
  dayNumber: number;
  dayOfWeekIndex: number;
};

export const CalendarRowItem: FC<CalendarRowItemProps> = ({
  dayNumber,
  dayOfWeekIndex,
}) => {
  const { isLandingPage, userData, now, selectedMonth, selectedYear } =
    useCalendar();
  const { currentColors } = useUiColors();

  const isToday =
    dayNumber === now.day &&
    selectedMonth === MONTHS_LIST[now.month] &&
    selectedYear === now.year;

  const bgColor = isLandingPage
    ? currentColors[LANDING_PAGE_MOODS[dayNumber] + 2]
    : dayNumber in userData
    ? currentColors[userData[dayNumber] + 2]
    : "transparent";
  const textColor = bgColor === "transparent" ? currentColors[5] : "white";
  const borderColor = isToday ? currentColors[10] : "transparent";

  const emojiBgColor = isLandingPage
    ? currentColors[0]
    : dayNumber in userData
    ? currentColors[0]
    : "transparent";
  const emojiBorderColor = isLandingPage
    ? currentColors[LANDING_PAGE_MOODS[dayNumber] + 3]
    : dayNumber in userData
    ? currentColors[userData[dayNumber] + 3]
    : "transparent";

  const demoMoodSymbol =
    MOODS_LIST.find(
      (mood) => mood.scaleValue === LANDING_PAGE_MOODS[dayNumber]
    ) || ({} as MoodItemType);

  const userMoodSymbol =
    dayNumber in userData
      ? MOODS_LIST.find((mood) => mood.scaleValue === userData[dayNumber])
      : ({} as MoodItemType);

  return (
    <Popover>
      <PopoverTrigger
        style={{
          "--bg-color": "transparent",
        }}
        className="duration-300 elementColors"
        disabled={isLandingPage ? false : !userMoodSymbol?.scaleValue}
      >
        <div
          style={{
            backgroundColor: bgColor,
            color: textColor,
            borderColor: borderColor,
          }}
          className={`
            flex flex-col items-start justify-center gap-1 sm:gap-2  
            p-1 sm:p-1
            rounded-lg border-2 calendarShadow
          `}
        >
          <p className="text-xs sm:text-sm md:text-base font-semibold">
            {dayNumber}
          </p>
          <div
            style={{
              backgroundColor: emojiBgColor,
              border: `1px solid ${emojiBorderColor}`,
            }}
            className="flex items-center justify-center w-full h-6 shrink-0 rounded-lg py-2 sm:py-4 bg-white"
          >
            <p className="">
              {isLandingPage ? demoMoodSymbol?.emoji : userMoodSymbol?.emoji}
            </p>
          </div>
        </div>

        <PopoverContent>
          <p style={{ color: currentColors[6] }} className="font-semibold">
            {dayNumber}. {DAY_LIST[dayOfWeekIndex]}
          </p>
          <p>
            {isLandingPage ? demoMoodSymbol?.emoji : userMoodSymbol?.emoji} -{" "}
            {isLandingPage ? demoMoodSymbol?.name : userMoodSymbol?.name}
          </p>
          <p>
            Mood scale value:{" "}
            <span style={{ color: currentColors[6] }} className="font-semibold">
              {isLandingPage
                ? demoMoodSymbol?.scaleValue
                : userMoodSymbol?.scaleValue}
            </span>
          </p>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
};
