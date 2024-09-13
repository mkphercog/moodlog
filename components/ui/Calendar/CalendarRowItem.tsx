"use client";

import { FC } from "react";
import { DAY_LIST, MOODS_LIST } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCalendar } from "./CalendarContext";
import { useUiColors } from "@/context/ColorsContext";
import { MoodItemType } from "@/types";
import { useCurrentDate } from "@/context/CurrentDateContext";
import { getMonthById } from "@/utils";

type CalendarRowItemProps = {
  dayNumber: number;
  dayOfWeekIndex: number;
  currentDayMoodValue: number | undefined;
};

export const CalendarRowItem: FC<CalendarRowItemProps> = ({
  dayNumber,
  dayOfWeekIndex,
  currentDayMoodValue,
}) => {
  const { selectedYear, selectedMonth } = useCalendar();
  const {
    currentDate: { YEAR, MONTH, DAY },
  } = useCurrentDate();
  const { currentColors } = useUiColors();

  const isToday =
    selectedYear === YEAR &&
    selectedMonth.id === getMonthById(MONTH).id &&
    dayNumber === DAY;

  const moodData = MOODS_LIST.find(
    (mood) => mood.scaleValue === currentDayMoodValue
  );

  return (
    <Popover>
      <PopoverTrigger disabled={!currentDayMoodValue}>
        <div
          style={{
            backgroundColor: currentDayMoodValue
              ? currentColors[currentDayMoodValue + 1]
              : "transparent",
            color:
              currentDayMoodValue && currentDayMoodValue > 3
                ? currentColors[0]
                : currentColors[8],
          }}
          className={`
            flex flex-col items-start justify-center gap-1 sm:gap-2  
            p-1 sm:p-2 rounded-lg elementColors 
            ${
              currentDayMoodValue
                ? "duration-300 hover:-translate-y-1"
                : "calendarShadow"
            }
          `}
        >
          <div
            style={{
              backgroundColor: isToday ? currentColors[10] : "transparent",
            }}
            className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full"
          >
            <p
              style={{
                color: isToday ? currentColors[0] : "inherit",
              }}
              className="text-xs sm:text-sm md:text-base font-semibold"
            >
              {dayNumber}
            </p>
          </div>
          <div
            style={{
              backgroundColor: currentDayMoodValue
                ? currentColors[0]
                : "transparent",
              borderColor: currentDayMoodValue
                ? currentColors[currentDayMoodValue + 3]
                : "transparent",
            }}
            className="flex items-center justify-center w-full h-6 py-2 sm:py-4 rounded-lg border"
          >
            <p>{moodData?.emoji}</p>
          </div>
        </div>
      </PopoverTrigger>

      <ItemPopoverContent
        dayNumber={dayNumber}
        dayOfWeekIndex={dayOfWeekIndex}
        moodData={moodData}
      />
    </Popover>
  );
};

type ItemPopoverContent = {
  dayNumber: number;
  dayOfWeekIndex: number;
  moodData: MoodItemType | undefined;
};

const ItemPopoverContent: FC<ItemPopoverContent> = ({
  dayNumber,
  dayOfWeekIndex,
  moodData,
}) => {
  const { currentColors } = useUiColors();

  return (
    <PopoverContent>
      <p style={{ color: currentColors[6] }} className="font-semibold">
        {dayNumber}. {DAY_LIST[dayOfWeekIndex]}
      </p>
      <p>{`${moodData?.emoji} - ${moodData?.name}`}</p>
      <p>
        Mood scale value:{" "}
        <span style={{ color: currentColors[6] }} className="font-semibold">
          {moodData?.scaleValue}
        </span>
      </p>
    </PopoverContent>
  );
};
