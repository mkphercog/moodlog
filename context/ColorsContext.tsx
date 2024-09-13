"use client";

import {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  FC,
  useEffect,
} from "react";
import { COLORS } from "@/constants";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "./AuthContext";
import { ColorNameType } from "@/types";
import { setUserDbSettings } from "@/actions";

type UiColorsContextType = {
  currentColorName: ColorNameType;
  currentColors: string[];
  setNewColor: (newColor: ColorNameType) => void;
  resetColor: () => void;
};

const UiColorsContext = createContext<UiColorsContextType | undefined>(
  undefined
);

export const UiColorsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentColor, setCurrentColor] = useState<ColorNameType>("green");
  const { currentUser } = useAuth();

  const setNewColor = async (newColor: ColorNameType) => {
    if (!currentUser || newColor === currentColor) return;
    setCurrentColor(newColor);
    setUserDbSettings({ userId: currentUser.uid, uiColor: newColor });
  };

  useEffect(() => {
    const getUserUiColor = async () => {
      if (!currentUser) return;

      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      const settings = docSnap.get("settings");

      if (docSnap.exists()) {
        setCurrentColor(settings.uiColor);
      }
    };

    getUserUiColor();
  }, [currentUser]);

  const resetColor = () => {
    setCurrentColor("green");
  };

  const value = {
    currentColorName: currentColor,
    currentColors: COLORS[currentColor],
    setNewColor,
    resetColor,
  };

  return (
    <UiColorsContext.Provider value={value}>
      {children}
    </UiColorsContext.Provider>
  );
};

export const useUiColors = () => {
  const context = useContext(UiColorsContext);

  if (context === undefined) {
    throw new Error("useUiColors must be used within a UiColorsProvider");
  }

  return context;
};
