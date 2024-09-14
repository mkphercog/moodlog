"use server";

import { INITIAL_USER_MOODS_DATA } from "@/constants";
import { adminDb } from "@/firebaseAdmin";
import { UserDbDataType } from "@/types";

type GetUserDbDataType = (userId: string) => Promise<UserDbDataType>;

export const getUserDbData: GetUserDbDataType = async (userId) => {
  const userDoc = await adminDb.collection("users").doc(userId).get();

  if (userDoc.exists) {
    return userDoc.data() as UserDbDataType;
  }

  return {
    moods: INITIAL_USER_MOODS_DATA,
    settings: {
      nextDateChangeUserName: 0,
      uiColor: "green",
    },
  };
};
