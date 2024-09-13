"use server";

import { adminAuth, adminDb } from "@/firebaseAdmin";

export const deleteUserWithData = async (userId: string) => {
  try {
    console.info(`>>>>> Deleting user (${userId}) data <<<<<`);
    await adminDb.collection("users").doc(userId).delete();
    console.info(">>>>> DONE <<<<<");

    console.info(`>>>>> Deleting user (${userId}) <<<<<`);
    adminAuth.revokeRefreshTokens(userId);
    await adminAuth.deleteUser(userId);
    console.info(">>>>> DONE <<<<<");

    return true;
  } catch (error) {
    console.info(">>>>> Error during deleting user or user data <<<<<");

    return false;
  }
};
