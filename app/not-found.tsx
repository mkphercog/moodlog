import { Button, Main } from "@/components/ui";
import { SECONDARY_FONT } from "@/constants";
import Link from "next/link";

export default function NotFound() {
  return (
    <Main>
      <div className="flex-1 flex flex-col gap-14 items-center justify-center">
        <h2
          className={`text-5xl sm:text-6xl !leading-[initial] text-center ${SECONDARY_FONT.className}`}
        >
          Where is your mood?
        </h2>
        <p className="text-4xl sm:text-5xl md:text-6xl">🤔</p>
        <Link href="/">
          <Button variant="dark">Check on the home page 😍</Button>
        </Link>
      </div>
    </Main>
  );
}
