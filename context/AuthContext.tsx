"use client";

import { auth, db } from "@/firebase";
import {
  User,
  UserCredential,
  UserMetadata,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { DocumentData, doc, getDoc } from "firebase/firestore";
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

type AuthContextType = {
  loading: boolean;
  currentUser: User | null;
  userDataObj: DocumentData | null;
  setUserDataObj: Dispatch<SetStateAction<UserMetadata | null>>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] =
    useState<AuthContextType["currentUser"]>(null);
  const [userDataObj, setUserDataObj] =
    useState<AuthContextType["userDataObj"]>(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setCurrentUser(null);
    setUserDataObj(null);

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
        let firebaseData = {};

        if (docSnap.exists()) {
          firebaseData = docSnap.data();
        }
        setUserDataObj(firebaseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    loading,
    currentUser,
    userDataObj,
    setUserDataObj,
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
