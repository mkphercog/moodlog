import { CallToAction } from "./";
import { Calendar } from "./ui";
import { HeroTitle } from "./HeroTitle";

export const Hero = () => {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <HeroTitle />
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full max-w-[600px] mx-auto">
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year.</span>
      </p>
      <CallToAction />
      <Calendar />
    </div>
  );
};
