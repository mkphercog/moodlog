"use client";

import { useToast } from "@/components/ui/use-toast";
import { ERROR_MESSAGES, USER_NAME_MAX_LENGTH } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export const useSettings = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { currentUser, updateUserName, logOut } = useAuth();
  const [canSetUserName, setCanSetUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>("");

  const handleSubmitDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !currentUser.email) return;

    if (!password.length) {
      setPasswordError(ERROR_MESSAGES["empty"]);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      await reauthenticateWithCredential(currentUser, credential)
        .then(async ({ user }) => {
          const docRef = doc(db, "users", currentUser.uid);
          await deleteDoc(docRef);
          await deleteUser(user);
          await logOut(false);

          toast({
            title: "It's hard to say that... 🥲",
            description:
              "Your account and all data has been successfully deleted. Have a nice day!",
          });
        })
        .catch(() => {
          setPasswordError(ERROR_MESSAGES["incorrect"]);
        });

      router.replace("/dashboard?mode=register");
    } catch (error) {
      toast({
        title: "Opss...",
        description:
          "Isn't a sign? 😊 Something went wrong while deleting account.",
      });
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

  const clearPasswordFields = () => {
    setPassword("");
    setPasswordError(null);
  };

  const passwordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  return {
    logOut,
    handleSubmitDelete,
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
    password: {
      value: password,
      error: passwordError,
      clearFields: clearPasswordFields,
      onChange: passwordOnChange,
    },
  };
};
