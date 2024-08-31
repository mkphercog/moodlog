"use client";

import { FC, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { SECONDARY_FONT, MOODS_LIST } from "@/constants";
import { DocumentData } from "firebase/firestore";
import { StatusesType } from "@/types";
import { getClockNumbers } from "@/utils";
import { useUiColors } from "@/context/ColorsContext";

const END_OF_DAY = new Date();
END_OF_DAY.setHours(23, 59, 59, 999);

type DashboardStatsProps = {
  data: DocumentData | null;
};

export const DashboardStats: FC<DashboardStatsProps> = ({ data }) => {
  const { currentColors } = useUiColors();
  const { seconds, minutes, hours, restart, isRunning } = useTimer({
    expiryTimestamp: END_OF_DAY,
  });

  useEffect(() => {
    if (!isRunning) {
      console.info("Time over, restarting...");
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      restart(now, true);
    }
  }, [isRunning, restart]);

  const countValues = () => {
    let totalDaysWithMood = 0;
    let moodsSum = 0;

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let dayMood = data[year][month][day];
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
    average_mood: `${countValues().averageMood}/${MOODS_LIST.length}`,
    time_remaining: `${getClockNumbers(hours)}:${getClockNumbers(
      minutes
    )}:${getClockNumbers(seconds)}`,
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
