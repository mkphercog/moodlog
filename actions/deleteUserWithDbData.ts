"use server";

import { adminAuth, adminDb } from "@/firebaseAdmin";

export const deleteUserWithDbData = async (userId: string) => {
  try {
    await adminDb.collection("users").doc(userId).delete();

    adminAuth.revokeRefreshTokens(userId);
    await adminAuth.deleteUser(userId);

    return true;
  } catch (error) {
    console.error(
      `>>>>> Error during deleting user (${userId}) or user data <<<<< `,
      error
    );

    return false;
  }
};
