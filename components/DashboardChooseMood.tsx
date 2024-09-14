"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { AnimatedEmoji, Button } from "./ui";
import { MOODS_LIST, SECONDARY_FONT } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useCurrentDate } from "@/context/CurrentDateContext";
import { setUserDbMood } from "@/actions";

const DashboardChooseMoodComponent = () => {
  const { currentUser, userMoodsData, setUserMoodsData } = useAuth();
  const {
    currentDate: { YEAR, MONTH, DAY },
  } = useCurrentDate();
  const { currentColors } = useUiColors();
  const searchParams = useSearchParams();
  const [currentAnimatedEmojiIndex, setCurrentAnimatedEmojiIndex] = useState(1);

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
    if (!currentUser) return;

    try {
      const response = await setUserDbMood({
        userId: currentUser.uid,
        year: YEAR,
        month: MONTH,
        day: DAY,
        mood: {
          scaleValue: mood,
        },
      });

      setUserMoodsData(response);
    } catch (error) {
      console.error("Failed to set data: ", error);
    }
  };

  const canAnimate = useMemo(
    () => !(searchParams.get("mode") === "settings"),
    [searchParams]
  );

  return (
    <>
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
          const selectedUserMood =
            userMoodsData?.[YEAR]?.[MONTH]?.[DAY]?.scaleValue || -1;

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
    </>
  );
};

export const DashboardChooseMood = memo(DashboardChooseMoodComponent);
