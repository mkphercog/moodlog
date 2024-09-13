"use server";

import { adminDb } from "@/firebaseAdmin";

type SetUserDbMoodProps = {
  userId: string;
  year: number;
  month: number;
  day: number;
  mood: {
    scaleValue: number;
  };
};

export const setUserDbMood = async ({
  userId,
  year,
  month,
  day,
  mood,
}: SetUserDbMoodProps) => {
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
