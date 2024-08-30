"use client";

import {
  useContext,
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  FC,
} from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { ErrorMessagesType } from "@/types";
import { useRouter } from "next/navigation";
import { getRedirectUrl } from "@/utils";
import { AuthContextType } from "./AuthContext.type";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { toast } = useToast();
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
      const registerResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      sendEmailVerification(registerResponse.user, {
        url: `${getRedirectUrl()}/dashboard?mode=login&email=${
          registerResponse.user.email
        }`,
      })
        .then(async () => {
          toast({
            title: "Check your mail! 📧",
            description:
              "We have sent you a verification email, click the link and log in to the app.",
          });
          await logOut();
        })
        .catch((reason) => console.error(reason));
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
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!response.user.emailVerified) {
        toast({
          title: "Check your mail! 📧",
          description:
            "Before log in to the app you need to verify your email.",
        });
        logOut(false);
        setAuthError("verification");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      setAuthError("incorrect");
    }
  };

  const logOut: AuthContextType["logOut"] = (shouldRedirect = true) => {
    setCurrentUser(null);
    setUserData(null);

    if (shouldRedirect) {
      router.replace("/");
    }

    return signOut(auth);
  };

  const updateUserName = async (userName: string) => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
    await auth.currentUser
      .reload()
      .then(() => {
        setCurrentUser(auth.currentUser);

        const toastMessage = userName
          ? `User name "${auth.currentUser?.displayName}" set correctly.`
          : "User name deleted correctly.";

        toast({
          title: "Success!",
          description: toastMessage,
        });
      })
      .catch(() => {
        toast({
          title: "Bad news",
          description:
            "Something went wrong while setting the name. Please try again.",
        });
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        if (!user || !user.emailVerified) {
          console.info("No user found!");
          return;
        }

        setCurrentUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { nextDateChangeUserName, uiColor, ...restData } =
            docSnap.data();
          setUserData(restData);
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
    updateUserName,
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
