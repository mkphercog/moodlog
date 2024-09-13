"use client";

import { ChangeEvent, FC, useEffect } from "react";
import { Button, Input } from "./ui";
import { useUiColors } from "@/context/ColorsContext";
import { getClockNum } from "@/utils";
import { useTimer } from "react-timer-hook";
import { useAuth } from "@/context/AuthContext";
import { getUserDbData } from "@/actions";

type SettingsUserNameFormProps = {
  userName: {
    value: string;
    valueInDB: string | null | undefined;
    settingsDesc: string;
    clearFields: () => void;
    canSet: boolean;
    submitNew: () => Promise<void>;
    updateCanSet: (value: boolean) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
  };
};

export const SettingsUserNameForm: FC<SettingsUserNameFormProps> = ({
  userName,
}) => {
  const { currentColors } = useUiColors();
  const { currentUser } = useAuth();
  const { hours, minutes, seconds, restart } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => userName.updateCanSet(true),
  });

  const userNameChangeAvailability = !userName.canSet
    ? `${getClockNum(hours)}:${getClockNum(minutes)}:${getClockNum(seconds)}`
    : "available";

  useEffect(() => {
    const getNextDateChange = async () => {
      if (!currentUser) return;
      const {
        settings: { nextDateChangeUserName },
      } = await getUserDbData(currentUser.uid);

      restart(new Date(nextDateChangeUserName), true);
      userName.updateCanSet(false);
    };

    getNextDateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.displayName]);

  return (
    <form
      action={userName.submitNew}
      className="flex flex-col items-start w-full sm:max-w-[50%] gap-2"
    >
      <p className="text-xs">
        User name change:{" "}
        <span
          className={`font-semibold ${userName.canSet ? "text-green-600" : ""}`}
        >
          {userNameChangeAvailability}
        </span>
      </p>
      <div className="w-full relative">
        <Input
          name="userName"
          value={userName.value}
          placeholder={
            userName.valueInDB
              ? `Current user name: ${userName.valueInDB}`
              : "How should we call you?"
          }
          onChange={userName.onChange}
          className="pr-[42px]"
          isError={!!userName.error}
          disabled={!userName.canSet}
        />
        <Button
          style={{
            "--text-color": currentColors[6],
            "--text-hover-color": currentColors[4],
          }}
          className={`
            flex items-center gap-0 !p-0 absolute top-0 right-0 bottom-0 w-[45px] border-none hover:!bg-transparent disabled:border-transparent disabled:!bg-transparent
            textColors
          `}
          variant="outline"
          disabled={!userName.canSet}
        >
          <i className="fa-solid fa-paper-plane text-xl w-full"></i>
        </Button>
      </div>
      <p className="text-xs">
        Hint: If you want to delete user name just update with empty value.
      </p>
      {userName.error && (
        <p className="text-xs sm:text-sm text-red-600 font-bold">
          {userName.error}
        </p>
      )}
    </form>
  );
};
