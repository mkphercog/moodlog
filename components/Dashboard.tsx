"use client";

import { FUGAZ_FONT } from "@/constants";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Loading } from "./Loading";
import { Login } from "./Login";
import { useTimer } from "react-timer-hook";

type Statuses = {
  num_days: number;
  average_mood: string;
  time_remaining: string;
};

const now = new Date();

export const MOODS = {
  "@*#%*!$": "😡",
  Sad: "😢",
  Existing: "😶",
  Good: "😊",
  Excellent: "😍",
};

const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

export const Dashboard = () => {
  const { seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp: endOfDay,
    onExpire: () => {
      console.log("Time over, restarting...");
      const newDate = new Date();
      newDate.setHours(23, 59, 59, 999);
      restart(newDate);
    },
  });
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState<Record<string, any>>({});

  const countValues = () => {
    let totalNumberOfDays = 0;
    let sumMoods = 0;

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let dayMood = data[year][month][day];
          totalNumberOfDays++;
          sumMoods += dayMood;
        }
      }
    }
    return {
      numDays: totalNumberOfDays,
      averageMood:
        totalNumberOfDays === 0
          ? "0"
          : (sumMoods / totalNumberOfDays).toFixed(2),
    };
  };

  const statuses: Statuses = {
    num_days: countValues().numDays,
    average_mood: `${countValues().averageMood}/5`,
    time_remaining: `${23 - now.getHours()}:${60 - now.getMinutes()}`,
  };

  const handleSetMood = async (mood: number) => {
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }

      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      console.log(
        "USER DATA MOOD: ",
        userDataObj?.[year]?.[month]?.[day],
        mood
      );
      if (userDataObj?.[year]?.[month]?.[day] === mood) {
        console.log("MOOD TAKI SAM");
        return;
      }

      newData[year][month][day] = mood;
      setData(newData);
      setUserDataObj(newData);
      const docRef = doc(db, "users", currentUser?.uid || "");
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.error("Failed to set data: ", error);
    }
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }

    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      {/* <div style={{ fontSize: "100px" }}>
        <span>{hours < 10 ? `0${hours}` : hours}</span>:
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div> */}
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
        {Object.entries(statuses).map(([key, value], index) => {
          const replacedKey = key.replaceAll("_", " ");
          return (
            <div className=" flex flex-col gap-1 sm:gap-2" key={index}>
              <p
                className="font-medium first-letter:capitalize text-xs sm:text-sm truncate"
                title={replacedKey}
              >
                {replacedKey}
              </p>
              <p
                className={`text-base sm:text-lg truncate ${FUGAZ_FONT.className}`}
                title={value.toString()}
              >
                {key === "time_remaining"
                  ? `${hours < 10 ? `0${hours}` : hours}:${
                      minutes < 10 ? `0${minutes}` : minutes
                    }:${seconds < 10 ? `0${seconds}` : seconds}`
                  : value}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${FUGAZ_FONT.className}`}
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.entries(MOODS).map(([key, mood], index) => {
          return (
            <Button
              onClick={() => handleSetMood(index + 1)}
              className={`purpleShadow  last:col-span-2
                last:md:col-span-4 last:lg:col-span-1 flex flex-col gap-2 items-center`}
              variant="outline"
              key={index}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{mood}</p>
              <p className="text-xs sm:text-sm md:text-base">{key}</p>
            </Button>
          );
        })}
      </div>
      <Calendar completeData={data} />
    </div>
  );
};
