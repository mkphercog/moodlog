"use client";

import { FC } from "react";
import { DAY_LIST, MONTHS_LIST, MOODS_LIST } from "@/constants";
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
  currentDayMoodValue: number | undefined;
};

export const CalendarRowItem: FC<CalendarRowItemProps> = ({
  dayNumber,
  dayOfWeekIndex,
  currentDayMoodValue,
}) => {
  const { now, selectedMonth, selectedYear } = useCalendar();
  const { currentColors } = useUiColors();

  const isToday =
    dayNumber === now.day &&
    selectedMonth === MONTHS_LIST[now.month] &&
    selectedYear === now.year;

  const moodData = MOODS_LIST.find(
    (mood) => mood.scaleValue === currentDayMoodValue
  );

  return (
    <Popover>
      <PopoverTrigger
        style={{
          "--bg-color": "transparent",
        }}
        className="duration-300 elementColors"
        disabled={!currentDayMoodValue}
      >
        <div
          style={{
            backgroundColor: currentDayMoodValue
              ? currentColors[currentDayMoodValue + 2]
              : "transparent",
            color: currentDayMoodValue ? currentColors[1] : currentColors[6],
            borderColor: isToday ? currentColors[10] : "transparent",
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
              backgroundColor: currentDayMoodValue
                ? currentColors[0]
                : "transparent",
              border: `1px solid ${
                currentDayMoodValue
                  ? currentColors[currentDayMoodValue + 3]
                  : "transparent"
              }`,
            }}
            className="flex items-center justify-center w-full h-6 shrink-0 rounded-lg py-2 sm:py-4 bg-white"
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
