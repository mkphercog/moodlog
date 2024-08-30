"use client";

import { Button } from "../Button";
import { SECONDARY_FONT } from "@/constants";
import { useCalendar } from "./CalendarContext";
import { useUiColors } from "@/context/ColorsContext";

export const CalendarActions = () => {
  const { changeMonth, goToTodayDay, displayCurrentDate } = useCalendar();
  const { currentColors } = useUiColors();

  return (
    <div className="grid grid-cols-[1fr_minmax(130px,1fr)_1fr] grid-rows-2 gap-2 items-center">
      <Button
        variant="outline"
        className="col-span-3 justify-self-end"
        onClick={goToTodayDay}
      >
        Today
      </Button>

      <Button
        variant="outline"
        className="ml-auto text-xl sm:text-2xl"
        onClick={() => changeMonth(-1)}
      >
        <i
          style={{ color: currentColors[4] }}
          className="fa-solid fa-circle-chevron-left"
        />
      </Button>

      <p
        style={{ color: currentColors[6] }}
        className={`text-lg sm:text-xl md:text-2xl text-center ${SECONDARY_FONT.className}`}
      >
        {displayCurrentDate}
      </p>

      <Button
        variant="outline"
        className="mr-auto text-xl sm:text-2xl"
        onClick={() => changeMonth(1)}
      >
        <i
          style={{ color: currentColors[4] }}
          className="fa-solid fa-circle-chevron-right "
        />
      </Button>
    </div>
  );
};
