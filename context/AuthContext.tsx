"use client";

import {
  useContext,
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import {
  User,
  UserMetadata,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { ErrorMessagesType } from "@/types";
import { useRouter } from "next/navigation";

type AuthContextType = {
  loading: boolean;
  currentUser: User | null;
  authError: ErrorMessagesType;
  setAuthError: Dispatch<SetStateAction<ErrorMessagesType>>;
  userData: DocumentData | null;
  setUserData: Dispatch<SetStateAction<UserMetadata | null>>;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] =
    useState<AuthContextType["currentUser"]>(null);
  const [userData, setUserData] = useState<AuthContextType["userData"]>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<ErrorMessagesType>("none");

  const signUp: AuthContextType["signUp"] = async (
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const emailExists = error.message.includes("already-in-use");
        setAuthError(emailExists ? "exists" : "incorrect");
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  const logIn: AuthContextType["logIn"] = async (
    email: string,
    password: string
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error) {
      setAuthError("incorrect");
    }
  };

  const logOut: AuthContextType["logOut"] = () => {
    setCurrentUser(null);
    setUserData(null);
    router.replace("/");

    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        if (!user) {
          console.info("No user found!");
          return;
        }

        setCurrentUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error("User data not found, ", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    loading,
    currentUser,
    authError,
    setAuthError,
    userData,
    setUserData,
    signUp,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }

  return context;
};
