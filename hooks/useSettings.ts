"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { deleteUserWithData } from "@/actions/deleteUserWithData";
import { useToast } from "@/components/ui/use-toast";
import { USER_NAME_MAX_LENGTH } from "@/constants";
import { useAuth } from "@/context/AuthContext";

export type DeletingStatusType = "unset" | "processing";

export const useSettings = () => {
  const { toast } = useToast();
  const { currentUser, updateUserName, logOut } = useAuth();
  const [canSetUserName, setCanSetUserName] = useState(false);
  const [deletingStatus, setDeletingStatus] =
    useState<DeletingStatusType>("unset");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState<string | null>(null);

  const handleSubmitDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !currentUser.email) return;
    setDeletingStatus("processing");

    const deletingStatus = await deleteUserWithData(currentUser.uid);

    if (deletingStatus) {
      logOut();
      toast({
        title: "It's hard to say that... 🥲",
        description:
          "Your account and all data has been successfully deleted. Have a nice day!",
      });
    } else {
      toast({
        title: "Opss...",
        description:
          "Isn't a sign? 😊 Something went wrong while deleting account.",
      });
      setDeletingStatus("unset");
    }
  };

  const handleSubmitNewUserName = async () => {
    if (!currentUser) return;

    if (!canSetUserName) {
      setUserNameError("It's not time yet ⏲️");
      return;
    } else if (userName.length > USER_NAME_MAX_LENGTH) {
      setUserNameError(`User name max length: ${USER_NAME_MAX_LENGTH}`);
      return;
    } else if (!userName.length && !currentUser.displayName) {
      setUserNameError("User name is already empty.");
      return;
    } else if (userName === currentUser.displayName) {
      setUserNameError(`Your current user name is the same.`);
      return;
    }

    await updateUserName(userName);
    setUserName("");
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const docRef = doc(db, "users", currentUser.uid);
    await setDoc(
      docRef,
      { settings: { nextDateChangeUserName: now.getTime() } },
      { merge: true }
    );
  };

  const clearUserNameFields = () => {
    setUserName("");
    setUserNameError(null);
  };

  const userNameSettingsDesc = currentUser?.displayName
    ? `${currentUser.displayName}'s account.`
    : "";

  const userNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setUserNameError(null);
  };

  return {
    logOut,
    handleSubmitDelete,
    deletingStatus,
    userName: {
      value: userName,
      valueInDB: currentUser?.displayName,
      settingsDesc: userNameSettingsDesc,
      clearFields: clearUserNameFields,
      canSet: canSetUserName,
      updateCanSet: (value: boolean) => setCanSetUserName(value),
      submitNew: handleSubmitNewUserName,
      onChange: userNameOnChange,
      error: userNameError,
    },
  };
};
