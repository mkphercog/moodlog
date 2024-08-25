import { FUGAZ_FONT } from "@/constants";
import { Calendar } from "./Calendar";
import { CallToAction } from "./CallToAction";

export const Hero = () => {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <h1
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${FUGAZ_FONT.className}`}
      >
        <span className="textGradient">Mood.log()</span> helps you track your{" "}
        <span className="textGradient">daily</span> mood!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full max-w-[600px] mx-auto">
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year.</span>
      </p>
      <CallToAction />
      <Calendar completeData={{}} demo={true} />
    </div>
  );
};
