"use server";

import { ColorNameType } from "@/types";
import { adminDb } from "@/firebaseAdmin";

export const initNewUserData = async (
  userId: string,
  uiColor: ColorNameType,
  currentDateInMs: number
) => {
  console.info(`>>>>> Create initial settings for user (${userId}) <<<<<`);
  await adminDb
    .collection("users")
    .doc(userId)
    .set({
      settings: {
        nextDateChangeUserName: currentDateInMs,
        uiColor,
      },
    });

  console.info(
    `>>>>> Create initial object 'moods' for user (${userId}) <<<<<`
  );
  await adminDb
    .collection("users")
    .doc(userId)
    .set({ moods: {} }, { merge: true });
};
