"use client";

import { INIT_DATE } from "@/constants";
import {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  FC,
  useEffect,
} from "react";

export type CurrentDateContextType = {
  currentDate: {
    DAY: number;
    MONTH: number;
    YEAR: number;
    END_OF_DAY: Date;
  };
  changeCurrentDate: () => void;
};

const CurrentDateContext = createContext<CurrentDateContextType | undefined>(
  undefined
);

export const CurrentDateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentDate, setCurrentDate] =
    useState<CurrentDateContextType["currentDate"]>(INIT_DATE);

  const changeCurrentDate = () => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);

    setCurrentDate({
      DAY: now.getDate(),
      MONTH: now.getMonth() + 1,
      YEAR: now.getFullYear(),
      END_OF_DAY: now,
    });
  };

  useEffect(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);

    setCurrentDate({
      DAY: now.getDate(),
      MONTH: now.getMonth() + 1,
      YEAR: now.getFullYear(),
      END_OF_DAY: now,
    });
  }, []);

  const value = {
    currentDate,
    changeCurrentDate,
  };

  return (
    <CurrentDateContext.Provider value={value}>
      {children}
    </CurrentDateContext.Provider>
  );
};

export const useCurrentDate = () => {
  const context = useContext(CurrentDateContext);

  if (context === undefined) {
    throw new Error("useCurrentDate must be used within a CurrentDateProvider");
  }

  return context;
};
