import { DAY_LIST, SECONDARY_FONT } from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";

export const CalendarColumnNames = () => {
  const { isMediumScreen } = useScreenSize();

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1">
      {DAY_LIST.map((dayOfWeek, index) => {
        return (
          <p
            key={index}
            className={`md:text-xl text-center truncate text-green-600 ${SECONDARY_FONT.className}`}
            title={dayOfWeek}
          >
            {isMediumScreen
              ? dayOfWeek
              : dayOfWeek.split("").filter((_letter, index) => index < 3)}
          </p>
        );
      })}
    </div>
  );
};
