"use client";

import { gradients, baseRating } from "@/utils";
import { FC, useState } from "react";
import { Button } from "./Button";
import { MOODS } from "./Dashboard";
import { useAuth } from "@/context/AuthContext";
import { FUGAZ_FONT } from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";

const months = {
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
const monthsArr = Object.keys(months);

const dayList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type CalendarProps = {
  completeData: Record<string, any>;
  demo?: boolean;
  handleSetMood?: (mood: number) => void;
};
const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

export const Calendar: FC<CalendarProps> = ({ demo = false, completeData }) => {
  const { isMediumScreen } = useScreenSize();
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  const handleIncrementMonth = (value: number) => {
    if (numericMonth + value < 0) {
      setSelectedYear((state) => state - 1);
      setSelectedMonth(monthsArr[11]);
    } else if (numericMonth + value > 11) {
      setSelectedYear((state) => state + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + value]);
    }
  };

  const goToTodayDay = () => {
    setSelectedYear(currentYear);
    setSelectedMonth(monthsArr[currentMonth]);
  };

  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 0);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    monthsArr.indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" className="ml-auto" onClick={goToTodayDay}>
        Today
      </Button>
      <div className="grid grid-cols-[1fr_minmax(150px,1fr)_1fr] grid-rows-1 gap-2 items-center">
        <Button
          variant="outline"
          className="ml-auto text-xl sm:text-2xl"
          onClick={() => handleIncrementMonth(-1)}
        >
          <i className="fa-solid fa-circle-chevron-left" />
        </Button>
        <p
          className={`text-center textGradient ${FUGAZ_FONT.className}`}
        >{`${selectedMonth}, ${selectedYear}`}</p>
        <Button
          variant="outline"
          className="mr-auto text-xl sm:text-2xl"
          onClick={() => handleIncrementMonth(1)}
        >
          <i className="fa-solid fa-circle-chevron-right" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayList.map((dayOfWeek, index) => {
          return (
            <p
              key={index}
              className={`text-center text-indigo-600 truncate ${FUGAZ_FONT.className}`}
              title={dayOfWeek}
            >
              {isMediumScreen
                ? dayOfWeek
                : dayOfWeek.split("").filter((_letter, index) => index < 3)}
            </p>
          );
        })}
      </div>
      <div className="flex flex-col overflow-hidden gap-1 pb-4 sm:pb-6 md:pb-10">
        {[...Array.from(Array(numRows).keys())].map((row, rowIndex) => {
          return (
            <div className="grid grid-cols-7 gap-1" key={rowIndex}>
              {dayList.map((_dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;
                let isToday =
                  dayIndex === now.getDate() &&
                  selectedMonth === monthsArr[currentMonth] &&
                  selectedYear === currentYear;
                if (!dayDisplay) {
                  return <div className="bg-white" key={dayOfWeekIndex} />;
                }

                let color = demo
                  ? gradients.indigo[baseRating[dayIndex]]
                  : dayIndex in data
                  ? gradients.indigo[data[dayIndex]]
                  : "white";

                const demoEmots =
                  dayIndex in baseRating
                    ? Object.values(MOODS)[baseRating[dayIndex] - 1]
                    : "";
                const userEmots =
                  dayIndex in data
                    ? Object.values(MOODS)[data[dayIndex] - 1]
                    : "";

                return (
                  <div
                    style={{ background: color }}
                    className={`text-xs sm:text-sm border border-solid px-1 py-2 sm:p-2 flex items-center gap-2 justify-between rounded-lg 
                  ${
                    isToday
                      ? "border-2 border-indigo-600 "
                      : "border-indigo-100"
                  } ${color === "white" ? "text-indigo-400" : "text-white"}
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
  );
};
