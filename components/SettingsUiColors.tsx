import { COLORS } from "@/constants";
import { useUiColors } from "@/context/ColorsContext";

export const SettingsUiColors = () => {
  const { currentColorName, setNewColor } = useUiColors();

  return (
    <div className="flex flex-col items-start">
      <p className="text-sm sm:text-base mt-5 mb-3">
        Choose your interface color:
      </p>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4 w-full md:w-auto justify-between md:justify-center">
        {Object.keys(COLORS).map((color) => {
          const isCurrentColor = color === currentColorName;
          return (
            <div className="flex flex-col items-center gap-3" key={color}>
              <div
                onClick={() => {
                  setNewColor(color);
                }}
                style={{
                  "--text-color": COLORS[color][3],
                  "--text-hover-color": COLORS[color][4],
                  "--bg-color": COLORS[color][6],
                  "--bg-hover-color": COLORS[color][5],
                  "--border-color": COLORS[color][7],
                  "--border-hover-color": COLORS[color][8],
                }}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full duration-700   
                  purpleShadow elementColors
                  ${
                    isCurrentColor
                      ? "fa-bounce"
                      : "hover:cursor-pointer hover:scale-90"
                  } 
                `}
              />
              <p
                style={{
                  "--text-color": COLORS[color][6],
                  "--text-hover-color": COLORS[color][6],
                }}
                className="font-semibold text-xs sm:text-sm first-letter:uppercase textColors"
              >
                {color}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
