import { ChangeEvent, FC } from "react";
import { Button, Input } from "./ui";

type SettingsUserNameFormProps = {
  userName: {
    value: string;
    valueInDB: string | null | undefined;
    settingsDesc: string;
    clearFields: () => void;
    canSet: boolean;
    submitNew: () => Promise<void>;
    changeAvailability: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
  };
};

export const SettingsUserNameForm: FC<SettingsUserNameFormProps> = ({
  userName,
}) => {
  return (
    <form
      action={userName.submitNew}
      className="flex flex-col items-start w-full sm:max-w-[50%] gap-2"
    >
      <p className="text-xs">
        Next user name change:{" "}
        <span
          className={`font-semibold ${userName.canSet ? "text-green-600" : ""}`}
        >
          {userName.changeAvailability}
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
          className="absolute top-0 right-0 bottom-0 w-[45px] hover:!bg-transparent hover:text-green-400 !p-0 disabled:border-transparent disabled:!bg-transparent"
          variant="outline"
          disabled={!userName.canSet}
        >
          <i className="fa-solid fa-paper-plane text-xl"></i>
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
