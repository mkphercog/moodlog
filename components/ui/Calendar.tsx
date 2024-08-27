"use client";

import { FC, useState } from "react";
import {
  DAY_LIST,
  SECONDARY_FONT,
  MONTHS_LIST,
  MOODS,
  GRADIENTS,
  LANDING_PAGE_MOODS,
} from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Button } from "./Button";
import { DocumentData } from "firebase/firestore";

type CalendarProps = {
  completeData: DocumentData | null;
  demo?: boolean;
  handleSetMood?: (mood: number) => void;
};

const NOW = new Date();
const currentDay = NOW.getDate();
const currentMonth = NOW.getMonth();
const currentYear = NOW.getFullYear();

export const Calendar: FC<CalendarProps> = ({ demo = false, completeData }) => {
  const { isMediumScreen } = useScreenSize();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS_LIST[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const numericMonth = MONTHS_LIST.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  const handleIncrementMonth = (value: number) => {
    if (numericMonth + value < 0) {
      setSelectedYear((state) => state - 1);
      setSelectedMonth(MONTHS_LIST[11]);
    } else if (numericMonth + value > 11) {
      setSelectedYear((state) => state + 1);
      setSelectedMonth(MONTHS_LIST[0]);
    } else {
      setSelectedMonth(MONTHS_LIST[numericMonth + value]);
    }
  };

  const goToTodayDay = () => {
    setSelectedYear(currentYear);
    setSelectedMonth(MONTHS_LIST[currentMonth]);
  };

  const monthNow = new Date(
    selectedYear,
    MONTHS_LIST.indexOf(selectedMonth),
    0
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    MONTHS_LIST.indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="ml-auto" onClick={goToTodayDay}>
        Today
      </Button>
      <div className="grid grid-cols-[1fr_minmax(130px,1fr)_1fr] grid-rows-1 gap-2 items-center">
        <Button
          variant="outline"
          className="ml-auto text-xl sm:text-2xl"
          onClick={() => handleIncrementMonth(-1)}
        >
          <i className="fa-solid fa-circle-chevron-left" />
        </Button>
        <p
          className={`text-lg sm:text-xl md:text-2xl text-center textGradient ${SECONDARY_FONT.className}`}
        >{`${selectedMonth}, ${selectedYear}`}</p>
        <Button
          variant="outline"
          className="mr-auto text-xl sm:text-2xl"
          onClick={() => handleIncrementMonth(1)}
        >
          <i className="fa-solid fa-circle-chevron-right" />
        </Button>
      </div>

      <div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 px-1 sm:px-2 md:px-5">
          {DAY_LIST.map((dayOfWeek, index) => {
            return (
              <p
                key={index}
                className={`md:text-xl text-center text-green-600 truncate ${SECONDARY_FONT.className}`}
                title={dayOfWeek}
              >
                {isMediumScreen
                  ? dayOfWeek
                  : dayOfWeek.split("").filter((_letter, index) => index < 3)}
              </p>
            );
          })}
        </div>
        <div className="flex flex-col overflow-hidden gap-1 sm:gap-2 p-1 sm:p-2 ">
          {[...Array.from(Array(numRows).keys())].map((row, rowIndex) => {
            return (
              <div className="grid grid-cols-7 gap-1 sm:gap-2" key={rowIndex}>
                {DAY_LIST.map((_dayOfWeek, dayOfWeekIndex) => {
                  let dayIndex =
                    rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
                  let dayDisplay =
                    dayIndex > daysInMonth
                      ? false
                      : row === 0 && dayOfWeekIndex < firstDayOfMonth
                      ? false
                      : true;
                  let isToday =
                    dayIndex === currentDay &&
                    selectedMonth === MONTHS_LIST[currentMonth] &&
                    selectedYear === currentYear;
                  if (!dayDisplay) {
                    return <div className="bg-white" key={dayOfWeekIndex} />;
                  }

                  let color = demo
                    ? GRADIENTS.green[LANDING_PAGE_MOODS[dayIndex] + 2]
                    : dayIndex in data
                    ? GRADIENTS.green[data[dayIndex] + 2]
                    : "white";

                  const demoEmots =
                    dayIndex in LANDING_PAGE_MOODS
                      ? Object.values(MOODS)[LANDING_PAGE_MOODS[dayIndex] - 1]
                      : "";
                  const userEmots =
                    dayIndex in data
                      ? Object.values(MOODS)[data[dayIndex] - 1]
                      : "";

                  return (
                    <div
                      style={{ background: color }}
                      className={`text-xs sm:text-sm px-1 py-2 sm:p-2 flex items-center gap-1 sm:gap-2 justify-between rounded-lg font-bold
                      ${
                        isToday
                          ? `border-2 calendarShadow border-green-950 `
                          : `border-2 calendarShadow border-transparent`
                      } ${color === "white" ? `text-green-500` : "text-white"}
                        `}
                      key={dayOfWeekIndex}
                    >
                      <p>{dayIndex}</p>
                      <p>{demo ? demoEmots : userEmots}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
