import { CalendarRowItem } from "./CalendarRowItem";
import { DAY_LIST } from "@/constants";
import { useCalendar } from "./CalendarContext";

export const CalendarRows = () => {
  const {
    rowsNum,
    firstDayOfMonth,

    daysInMonth,
  } = useCalendar();
  return (
    <div className="flex flex-col gap-1 sm:gap-2 p-[1px] overflow-hidden">
      {[...Array.from(Array(rowsNum).keys())].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-1 sm:gap-2">
            {DAY_LIST.map((_dayOfWeek, dayOfWeekIndex) => {
              const dayNumber =
                rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

              if (
                (row === 0 && dayOfWeekIndex < firstDayOfMonth) ||
                dayNumber > daysInMonth
              ) {
                return <div key={dayOfWeekIndex} className="bg-transparent" />;
              }

              return (
                <CalendarRowItem key={dayOfWeekIndex} dayNumber={dayNumber} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
