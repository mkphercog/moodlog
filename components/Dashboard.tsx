import { FUGAZ_FONT } from "@/constants";
import { Button } from "./Button";
import { Calendar } from "./Calendar";

type Statuses = {
  num_days: number;
  time_remaining: string;
  date: string;
};

export const Dashboard = () => {
  const statuses: Statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "@*#%*!$": "😡",
    Sad: "😢",
    Existing: "😶",
    Good: "😊",
    Excellent: "😍",
  };

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
        {Object.entries(statuses).map(([key, value], index) => {
          const replacedKey = key.replaceAll("_", " ");
          return (
            <div className=" flex flex-col gap-1 sm:gap-2" key={index}>
              <p
                className="font-medium uppercase text-xs sm:text-sm truncate"
                title={replacedKey}
              >
                {replacedKey}
              </p>
              <p
                className={`text-base sm:text-lg truncate ${FUGAZ_FONT.className}`}
                title={value.toString()}
              >
                {value}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${FUGAZ_FONT.className}`}
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.entries(moods).map(([key, value], index) => {
          return (
            <Button
              className={`purpleShadow  last:col-span-2
                last:md:col-span-4 last:lg:col-span-1 flex flex-col gap-2 items-center`}
              variant="outline"
              key={index}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{value}</p>
              <p className="text-xs sm:text-sm md:text-base">{key}</p>
            </Button>
          );
        })}
      </div>
      <Calendar />
    </div>
  );
};
