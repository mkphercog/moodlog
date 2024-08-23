"use client";

import { gradients, baseRating, demoData } from "@/utils";
import { FC } from "react";

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
const year = 2024;
const month = "July";

type CalendarProps = {
  demo?: boolean;
};

export const Calendar: FC<CalendarProps> = ({ demo = false }) => {
  const now = new Date();
  //new Date(year, monthsArr.indexOf(month), 1 <-----) will be config for Sundey as a first day of calendar
  const monthNow = new Date(year, monthsArr.indexOf(month), 0);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(year, monthsArr.indexOf(month) + 1, 0).getDate();

  // const data = completeData?.[selectedYear]?.[numericMonth] || {}

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      {[...Array.from(Array(numRows).keys())].map((row, rowIndex) => {
        return (
          <div className="grid grid-cols-7 gap-1" key={rowIndex}>
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
              let dayDisplay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayOfWeekIndex < firstDayOfMonth
                  ? false
                  : true;
              let isToday = dayIndex === now.getDate();
              if (!dayDisplay) {
                return <div className="bg-white" key={dayOfWeekIndex} />;
              }

              let color = demo
                ? gradients.indigo[baseRating[dayIndex]]
                : dayIndex in demoData
                ? gradients.indigo[demoData[dayIndex]]
                : "white";

              return (
                <div
                  style={{ background: color }}
                  className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg 
                    ${isToday ? "border-indigo-400" : "border-indigo-100"} ${
                    color === "white" ? "text-indigo-400" : "text-white"
                  }
                  `}
                  key={dayOfWeekIndex}
                >
                  <p>
                    {dayIndex} - {dayOfWeek}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
