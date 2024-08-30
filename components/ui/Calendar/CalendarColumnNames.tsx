import { DAY_LIST, SECONDARY_FONT } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";
import { useScreenSize } from "@/hooks/useScreenSize";

export const CalendarColumnNames = () => {
  const { isMediumScreen } = useScreenSize();
  const { currentColors } = useUiColors();

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1">
      {DAY_LIST.map((dayOfWeek, index) => {
        return (
          <p
            key={index}
            style={{ color: currentColors[6] }}
            className={`md:text-xl text-center truncate ${SECONDARY_FONT.className}`}
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
