"use client";

import {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  FC,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCurrentDate } from "@/context/CurrentDateContext";
import { getMonthById } from "@/utils";
import { UserDbDayType } from "@/types";

type CalendarContextType = {
  isLandingPage: boolean;
  userMoodsData: { [day: string]: UserDbDayType };
  rowsNum: number;
  daysInMonth: number;
  firstDayOfMonth: number;
  selectedMonth: { id: number; name: string };
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
  const [selectedMonth, setSelectedMonth] = useState(getMonthById(MONTH));
  const [selectedYear, setSelectedYear] = useState(YEAR);

  const data = userMoodsData?.[selectedYear]?.[selectedMonth.id] || {};

  useEffect(() => {
    setSelectedMonth(getMonthById(MONTH));
    setSelectedYear(YEAR);
  }, [MONTH, YEAR]);

  const displayedMonth = new Date(selectedYear, selectedMonth.id - 1, 0);
  const firstDayOfMonth = displayedMonth.getDay();
  const daysInMonth = new Date(selectedYear, selectedMonth.id, 0).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const rowsNum = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  const changeMonth = (value: number) => {
    if (selectedMonth.id + value < 1) {
      setSelectedYear((state) => state - 1);
      setSelectedMonth(getMonthById(12));
    } else if (selectedMonth.id + value > 12) {
      setSelectedYear((state) => state + 1);
      setSelectedMonth(getMonthById(1));
    } else {
      setSelectedMonth(getMonthById(selectedMonth.id + value));
    }
  };

  const goToTodayDay = () => {
    setSelectedYear(YEAR);
    setSelectedMonth(getMonthById(MONTH));
  };

  const value = {
    isLandingPage,
    userMoodsData: data,
    rowsNum,
    firstDayOfMonth,
    daysInMonth,
    selectedMonth,
    selectedYear,
    displayCurrentDate: `${selectedMonth.name}, ${selectedYear}`,
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
