import { SetStateAction, Dispatch } from "react";
import { User } from "firebase/auth";
import { ErrorMessagesType, UserDbDataType } from "@/types";

export type AuthContextType = {
  loading: boolean;
  currentUser: User | null;
  authError: ErrorMessagesType;
  setAuthError: Dispatch<SetStateAction<ErrorMessagesType>>;
  userMoodsData: UserDbDataType["moods"] | null;
  setUserMoodsData: Dispatch<SetStateAction<UserDbDataType["moods"] | null>>;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: (shouldRedirect?: boolean) => Promise<void>;
  updateUserName: (userName: string) => Promise<void>;
};
