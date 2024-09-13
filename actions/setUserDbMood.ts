"use server";

import { adminDb } from "@/firebaseAdmin";
import { UserDbDataType } from "@/types";

type SetUserDbMoodType = (props: {
  userId: string;
  year: number;
  month: number;
  day: number;
  mood: {
    scaleValue: number;
  };
}) => Promise<UserDbDataType["moods"]>;

export const setUserDbMood: SetUserDbMoodType = async ({
  userId,
  year,
  month,
  day,
  mood,
}) => {
  await adminDb
    .collection("users")
    .doc(userId)
    .set(
      {
        moods: {
          [year]: { [month]: { [day]: mood } },
        },
      },
      { merge: true }
    );

  const userDbData = await adminDb.collection("users").doc(userId).get();
  return userDbData.data()?.moods as UserDbDataType["moods"];
};
