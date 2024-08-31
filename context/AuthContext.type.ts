import { SetStateAction, Dispatch } from "react";
import { DocumentData } from "firebase/firestore";
import { User, UserMetadata } from "firebase/auth";
import { ErrorMessagesType } from "@/types";

export type AuthContextType = {
  loading: boolean;
  currentUser: User | null;
  authError: ErrorMessagesType;
  setAuthError: Dispatch<SetStateAction<ErrorMessagesType>>;
  userMoodsData: DocumentData | null;
  setUserMoodsData: Dispatch<SetStateAction<UserMetadata | null>>;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: (shouldRedirect?: boolean) => Promise<void>;
  updateUserName: (userName: string) => Promise<void>;
};
