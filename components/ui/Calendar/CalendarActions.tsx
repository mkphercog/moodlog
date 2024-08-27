import { Button } from "../Button";
import { SECONDARY_FONT } from "@/constants";
import { useCalendar } from "./CalendarContext";

export const CalendarActions = () => {
  const { changeMonth, goToTodayDay, displayCurrentDate } = useCalendar();

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
        <i className="fa-solid fa-circle-chevron-left text-green-400" />
      </Button>

      <p
        className={`text-lg sm:text-xl md:text-2xl text-green-600 text-center ${SECONDARY_FONT.className}`}
      >
        {displayCurrentDate}
      </p>

      <Button
        variant="outline"
        className="mr-auto text-xl sm:text-2xl"
        onClick={() => changeMonth(1)}
      >
        <i className="fa-solid fa-circle-chevron-right text-green-400" />
      </Button>
    </div>
  );
};
