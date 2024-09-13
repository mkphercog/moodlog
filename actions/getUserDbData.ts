"use server";

import { adminDb } from "@/firebaseAdmin";
import { UserDbDataType } from "@/types";

type GetUserDbDataType = (userId: string) => Promise<UserDbDataType>;

export const getUserDbData: GetUserDbDataType = async (userId) => {
  const userDoc = await adminDb.collection("users").doc(userId).get();

  if (userDoc.exists) {
    return userDoc.data() as UserDbDataType;
  }

  return {
    moods: {},
    settings: {
      nextDateChangeUserName: 0,
      uiColor: "green",
    },
  };
};
