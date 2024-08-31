import { ChangeEvent, FC, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import {
  AnimatedEmoji,
  BASIC_BUTTON_CLASS_NAMES,
  Button,
  InputPassword,
  getButtonColors,
} from "./ui";
import { useUiColors } from "@/context/ColorsContext";

type SettingsDeleteUserProps = {
  password: {
    value: string;
    error: string | null;
    clearFields: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  handleSubmitDelete: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const SettingsDeleteUser: FC<SettingsDeleteUserProps> = ({
  password,
  handleSubmitDelete,
}) => {
  const { currentColorName } = useUiColors();

  return (
    <Dialog onOpenChange={password.clearFields}>
      <DialogTrigger
        className={`
          ${BASIC_BUTTON_CLASS_NAMES}
          text-red-500 hover:text-red-400 duration-300 font-semibold mt-10 self-end border-none
        `}
      >
        Delete account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full gap-2">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmitDelete}
          >
            <InputPassword
              value={password.value}
              onChange={password.onChange}
              isError={!!password.error}
            />
            {password.error && (
              <p className="text-xs sm:text-sm text-red-600 font-bold">
                {password.error}
              </p>
            )}
            <div className="flex items-center justify-between gap-2">
              <DialogClose
                style={getButtonColors(currentColorName, "outline")}
                className={`${BASIC_BUTTON_CLASS_NAMES} elementColors`}
                type="button"
              >
                Cancel
              </DialogClose>
              <AnimatedEmoji
                canAnimate
                emojiVariant="pleading"
                className="w-16 h-16"
              />
              <Button variant="destructive">Delete</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
