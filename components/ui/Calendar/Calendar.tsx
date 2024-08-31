"use client";

import { CalendarProvider } from "./CalendarContext";
import { CalendarActions } from "./CalendarActions";
import { CalendarColumnNames } from "./CalendarColumnNames";
import { CalendarRows } from "./CalendarRows";

export const Calendar = () => {
  return (
    <CalendarProvider>
      <div className="flex flex-col gap-2">
        <CalendarActions />
        <div>
          <CalendarColumnNames />
          <CalendarRows />
        </div>
      </div>
    </CalendarProvider>
  );
};
