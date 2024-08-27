import { FC, PropsWithChildren } from "react";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return <main className="flex-1 flex flex-col p-4 sm:p-8">{children}</main>;
};
