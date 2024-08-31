import { CalendarRowItem } from "./CalendarRowItem";
import { DAY_LIST, LANDING_PAGE_MOODS, MONTHS_LIST } from "@/constants";
import { useCalendar } from "./CalendarContext";

export const CalendarRows = () => {
  const {
    isLandingPage,
    rowsNum,
    firstDayOfMonth,
    daysInMonth,
    userMoodsData,
    selectedYear,
    selectedMonth,
    now,
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

              let currentDayMoodValue: number | undefined;
              const selectedMonthIndex = MONTHS_LIST.findIndex(
                (month) => month === selectedMonth
              );

              const selectedYearIsLower = selectedYear < now.year;
              const currentYearAndSelectedMonthIsLower =
                selectedYear === now.year && selectedMonthIndex < now.month;
              const currentYearAndMonthDaysAreLower =
                selectedYear === now.year &&
                selectedMonthIndex === now.month &&
                dayNumber <= now.day;

              if (isLandingPage) {
                if (
                  selectedYearIsLower ||
                  currentYearAndSelectedMonthIsLower ||
                  currentYearAndMonthDaysAreLower
                ) {
                  currentDayMoodValue = LANDING_PAGE_MOODS[dayNumber];
                } else {
                  currentDayMoodValue = undefined;
                }
              } else if (dayNumber in userMoodsData) {
                currentDayMoodValue = userMoodsData[dayNumber];
              } else {
                currentDayMoodValue = undefined;
              }

              return (
                <CalendarRowItem
                  key={dayOfWeekIndex}
                  currentDayMoodValue={currentDayMoodValue}
                  dayNumber={dayNumber}
                  dayOfWeekIndex={dayOfWeekIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
