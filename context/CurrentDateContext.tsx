"use client";

import {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  FC,
} from "react";

const NOW = new Date();
NOW.setHours(23, 59, 59, 999);

const INITIAL_DATE = {
  DAY: NOW.getDate(),
  MONTH: NOW.getMonth(),
  YEAR: NOW.getFullYear(),
  END_OF_DAY: NOW,
};

type CurrentDateContextType = {
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
  const [currentDate, setCurrentDate] = useState(INITIAL_DATE);

  const changeCurrentDate = () => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);

    setCurrentDate({
      DAY: now.getDate(),
      MONTH: now.getMonth(),
      YEAR: now.getFullYear(),
      END_OF_DAY: now,
    });
  };

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
