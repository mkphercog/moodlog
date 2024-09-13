"use client";

import { FC, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { SECONDARY_FONT, MOODS_LIST } from "@/constants";
import { StatusesType, UserDbDataType } from "@/types";
import { useUiColors } from "@/context/ColorsContext";
import { useCurrentDate } from "@/context/CurrentDateContext";
import { getClockNum } from "@/utils";

type DashboardStatsProps = {
  data: UserDbDataType["moods"] | null;
};

export const DashboardStats: FC<DashboardStatsProps> = ({ data }) => {
  const { currentDate, changeCurrentDate } = useCurrentDate();
  const { currentColors } = useUiColors();
  const { seconds, minutes, hours, restart, isRunning } = useTimer({
    expiryTimestamp: currentDate.END_OF_DAY,
    onExpire: changeCurrentDate,
  });

  useEffect(() => {
    if (!isRunning) {
      restart(currentDate.END_OF_DAY, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, restart]);

  const countValues = () => {
    let totalDaysWithMood = 0;
    let moodsSum = 0;

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let dayMood = data[year][month][day].scaleValue;
          totalDaysWithMood++;
          moodsSum += dayMood;
        }
      }
    }
    return {
      numDays: totalDaysWithMood,
      averageMood: !totalDaysWithMood
        ? "0"
        : (moodsSum / totalDaysWithMood).toFixed(2),
    };
  };

  const statuses: StatusesType = {
    total_days: countValues().numDays,
    average_mood: `
      ${countValues().averageMood}/${MOODS_LIST.length}
    `,
    time_remaining: `
      ${getClockNum(hours)}:${getClockNum(minutes)}:${getClockNum(seconds)}
    `,
  };

  return (
    <div
      style={{
        backgroundColor: currentColors[0],
        color: currentColors[5],
      }}
      className="grid grid-cols-3 rounded-lg p-4 gap-4"
    >
      {Object.entries(statuses).map(([key, status]) => {
        const replacedKey = key.replaceAll("_", " ");

        return (
          <div key={status} className=" flex flex-col gap-1 sm:gap-2">
            <p className="font-medium first-letter:capitalize text-xs sm:text-sm truncate">
              {replacedKey}
            </p>
            <p
              className={`text-xl sm:text-2xl truncate ${SECONDARY_FONT.className}`}
            >
              {status}
            </p>
          </div>
        );
      })}
    </div>
  );
};
