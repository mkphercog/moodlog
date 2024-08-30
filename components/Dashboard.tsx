"use client";

import { DocumentData, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Login, DashboardStats } from "./";
import { Button, Calendar, Loading } from "./ui";
import { SECONDARY_FONT, MOODS } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { useUiColors } from "@/context/ColorsContext";

const NOW = new Date();
const year = NOW.getFullYear();
const month = NOW.getMonth();
const day = NOW.getDate();

export const Dashboard = () => {
  const { currentUser, userData, setUserData, loading } = useAuth();
  const { currentColors } = useUiColors();

  const handleSetMood = async (mood: number) => {
    try {
      const newData: DocumentData = { ...userData };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      if (userData?.[year]?.[month]?.[day] === mood) {
        return;
      }
      newData[year][month][day] = mood;

      setUserData(newData);
      const docRef = doc(db, "users", currentUser?.uid || "");
      await setDoc(
        docRef,
        {
          [year]: { [month]: { [day]: mood } },
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
      <DashboardStats data={userData} />
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
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-4">
        {Object.entries(MOODS).map(([key, mood], index) => {
          const selectedUserMood = userData?.[year]?.[month]?.[day];

          return (
            <Button
              onClick={() => handleSetMood(index + 1)}
              style={{
                "--bg-color":
                  selectedUserMood - 1 === index
                    ? currentColors[1]
                    : "transparent",
                "--bg-hover-color":
                  selectedUserMood - 1 === index
                    ? currentColors[1]
                    : currentColors[0],
                "--border-color": "transparent",
                "--border-hover-color": "transparent",
                "--text-color": currentColors[6],
                "--text-hover-color": currentColors[6],
              }}
              className={`
                flex flex-col gap-2 items-center 
                purpleShadow
                md:col-span-2 lg:col-span-1
                last:col-span-2 last:md:col-span-3 last:lg:col-span-1 
                md:[&:nth-child(4)]:col-span-3 lg:[&:nth-child(4)]:col-span-1
                ${
                  selectedUserMood - 1 === index
                    ? "cursor-not-allowed selectedMood"
                    : ""
                }
              `}
              variant="outline"
              key={index}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl !leading-[initial]">
                {mood}
              </p>
              <p className="text-xs sm:text-sm md:text-base first-letter:uppercase">
                {key}
              </p>
            </Button>
          );
        })}
      </div>
      <Calendar />
    </div>
  );
};
