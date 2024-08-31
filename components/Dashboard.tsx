"use client";

import { DocumentData, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Login, DashboardStats } from "./";
import { AnimatedEmoji, Button, Calendar, Loading } from "./ui";
import { SECONDARY_FONT, MOODS_LIST } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useUiColors } from "@/context/ColorsContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const NOW = new Date();
const year = NOW.getFullYear();
const month = NOW.getMonth();
const day = NOW.getDate();

export const Dashboard = () => {
  const { currentUser, userMoodsData, setUserMoodsData, loading } = useAuth();
  const searchParams = useSearchParams();
  const { currentColors } = useUiColors();
  const [currentAnimatedEmojiIndex, setCurrentAnimatedEmojiIndex] = useState(1);

  const canAnimate = !(searchParams.get("mode") === "settings");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimatedEmojiIndex((stateIndex) => {
        if (stateIndex === MOODS_LIST.length) {
          return 1;
        }

        return (stateIndex += 1);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSetMood = async (mood: number) => {
    try {
      const newData: DocumentData = { ...userMoodsData };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      if (userMoodsData?.[year]?.[month]?.[day] === mood) {
        return;
      }
      newData[year][month][day] = mood;

      setUserMoodsData(newData);
      const docRef = doc(db, "users", currentUser?.uid || "");
      await setDoc(
        docRef,
        {
          moods: { [year]: { [month]: { [day]: mood } } },
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.error("Failed to set data: ", error);
    }
  };

  if (loading) {
    return <Loading size="lg" />;
  }

  if (!currentUser || !currentUser.emailVerified) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <DashboardStats data={userMoodsData} />
      <h4
        className={`text-5xl sm:text-6xl md:text-7xl text-center !leading-[initial] ${SECONDARY_FONT.className}`}
      >
        How do you{" "}
        <span
          style={{
            "--gradient-dark-color": currentColors[7],
            "--gradient-light-color": currentColors[4],
          }}
          className="textGradient"
        >
          feel
        </span>{" "}
        today?
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-7 gap-4">
        {MOODS_LIST.map((mood) => {
          const selectedUserMood = userMoodsData?.[year]?.[month]?.[day];

          return (
            <Button
              key={mood.id}
              onClick={() => handleSetMood(mood.scaleValue)}
              style={{
                "--bg-color":
                  selectedUserMood === mood.scaleValue
                    ? currentColors[1]
                    : "transparent",
                "--bg-hover-color":
                  selectedUserMood === mood.scaleValue
                    ? currentColors[1]
                    : currentColors[0],
                "--border-color": "transparent",
                "--border-hover-color": "transparent",
                "--text-color": currentColors[6],
                "--text-hover-color": currentColors[6],
              }}
              className={`
                !px-0 !py-5
                flex flex-col gap-2 items-center 
                purpleShadow
                md:col-span-2 lg:col-span-1
                last:col-span-2 last:md:col-span-4 last:lg:col-span-1
                ${
                  selectedUserMood === mood.scaleValue
                    ? "cursor-not-allowed selectedMood"
                    : ""
                }
              `}
              variant="outline"
            >
              {
                <AnimatedEmoji
                  canAnimate={
                    canAnimate &&
                    (selectedUserMood === mood.scaleValue ||
                      currentAnimatedEmojiIndex === mood.scaleValue)
                  }
                  emojiVariant={mood.animatedEmojiVariant}
                  className={`
                    duration-300 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]
                    ${
                      canAnimate &&
                      currentAnimatedEmojiIndex === mood.scaleValue
                        ? "scale-[1.33]"
                        : ""
                    }
                  `}
                />
              }
              <p className="text-sm sm:text-base truncate">{mood.name}</p>
            </Button>
          );
        })}
      </div>
      <Calendar />
    </div>
  );
};
