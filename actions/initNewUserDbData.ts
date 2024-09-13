"use server";

import { ColorNameType } from "@/types";
import { adminDb } from "@/firebaseAdmin";

export const initNewUserDbData = async (
  userId: string,
  uiColor: ColorNameType,
  currentDateInMs: number
) => {
  await adminDb
    .collection("users")
    .doc(userId)
    .set(
      {
        settings: {
          nextDateChangeUserName: currentDateInMs,
          uiColor,
        },
      },
      { merge: true }
    );

  await adminDb
    .collection("users")
    .doc(userId)
    .set({ moods: {} }, { merge: true });
};
