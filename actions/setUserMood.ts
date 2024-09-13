"use server";

import { adminDb } from "@/firebaseAdmin";

type SetUserMoodProps = {
  userId: string;
  year: number;
  month: number;
  day: number;
  mood: {
    scaleValue: number;
  };
};

export const setUserMood = async ({
  userId,
  year,
  month,
  day,
  mood,
}: SetUserMoodProps) => {
  await adminDb
    .collection("users")
    .doc(userId)
    .set(
      {
        moods: {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
      },
      { merge: true }
    );

  return (await adminDb.collection("users").doc(userId).get()).data()?.moods;
};
