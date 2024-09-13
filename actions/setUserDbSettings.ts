"use server";

import { adminDb } from "@/firebaseAdmin";
import { ColorNameType } from "@/types";

type SetUserSettingsProps = {
  userId: string;
  uiColor?: ColorNameType;
  nextDateChangeUserName?: number;
};

export const setUserDbSettings = async ({
  userId,
  ...rest
}: SetUserSettingsProps) => {
  await adminDb
    .collection("users")
    .doc(userId)
    .set(
      {
        settings: {
          ...rest,
        },
      },
      { merge: true }
    );
};
