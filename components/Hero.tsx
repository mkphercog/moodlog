import { FUGAZ_FONT } from "@/constants";
import { Button } from "./Button";
import { Calendar } from "./Calendar";

export const Hero = () => {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${FUGAZ_FONT.className}`}
      >
        <span className="textGradient">Mood.log</span> helps you track your{" "}
        <span className="textGradient">daily</span> mood!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full max-w-[600px] mx-auto">
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year.</span>
      </p>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Button>Sign Up</Button>
        <Button variant="dark">Login</Button>
      </div>
      <Calendar demo={true} />
    </div>
  );
};
