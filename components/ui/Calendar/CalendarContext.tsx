"use client";

import {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  FC,
  useEffect,
} from "react";
import { DocumentData } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { MONTHS_LIST } from "@/constants";
import { useCurrentDate } from "@/context/CurrentDateContext";

type CalendarContextType = {
  isLandingPage: boolean;
  userMoodsData: DocumentData;
  rowsNum: number;
  daysInMonth: number;
  firstDayOfMonth: number;
  selectedMonth: string;
  selectedYear: number;
  displayCurrentDate: string;
  changeMonth: (value: number) => void;
  goToTodayDay: () => void;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider: FC<PropsWithChildren> = ({ children }) => {
  const pathName = usePathname();
  const isLandingPage = pathName === "/";

  const {
    currentDate: { YEAR, MONTH },
  } = useCurrentDate();
  const { userMoodsData } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS_LIST[MONTH]);
  const [selectedYear, setSelectedYear] = useState(YEAR);

  const numericMonth = MONTHS_LIST.indexOf(selectedMonth);
  const data = userMoodsData?.[selectedYear]?.[numericMonth] || {};

  useEffect(() => {
    setSelectedMonth(MONTHS_LIST[MONTH]);
    setSelectedYear(YEAR);
  }, [MONTH, YEAR]);

  const displayedMonth = new Date(
    selectedYear,
    MONTHS_LIST.indexOf(selectedMonth),
    0
  );
  const firstDayOfMonth = displayedMonth.getDay();
  const daysInMonth = new Date(
    selectedYear,
    MONTHS_LIST.indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const rowsNum = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  const changeMonth = (value: number) => {
    if (numericMonth + value < 0) {
      setSelectedYear((state) => state - 1);
      setSelectedMonth(MONTHS_LIST[11]);
    } else if (numericMonth + value > 11) {
      setSelectedYear((state) => state + 1);
      setSelectedMonth(MONTHS_LIST[0]);
    } else {
      setSelectedMonth(MONTHS_LIST[numericMonth + value]);
    }
  };

  const goToTodayDay = () => {
    setSelectedYear(YEAR);
    setSelectedMonth(MONTHS_LIST[MONTH]);
  };

  const value = {
    isLandingPage,
    userMoodsData: data,
    rowsNum,
    firstDayOfMonth,
    daysInMonth,
    selectedMonth,
    selectedYear,
    displayCurrentDate: `${selectedMonth}, ${selectedYear}`,
    changeMonth,
    goToTodayDay,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }

  return context;
};
