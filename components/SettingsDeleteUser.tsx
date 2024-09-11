"use client";

import { FC, FormEvent } from "react";
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
  Loading,
  getButtonColors,
} from "./ui";
import { useUiColors } from "@/context/ColorsContext";
import { DeletingStatusType } from "@/hooks/useSettings";

type SettingsDeleteUserProps = {
  handleSubmitDelete: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  deletingStatus: DeletingStatusType;
};

export const SettingsDeleteUser: FC<SettingsDeleteUserProps> = ({
  handleSubmitDelete,
  deletingStatus,
}) => {
  const { currentColorName } = useUiColors();
  const isProcessing = deletingStatus === "processing";

  return (
    <Dialog>
      <DialogTrigger
        className={`
            ${BASIC_BUTTON_CLASS_NAMES}
            mt-10 self-end font-semibold border-none
            duration-300 text-red-500 hover:text-red-400 
            `}
      >
        Delete account
      </DialogTrigger>
      <DialogContent
        disableClose={isProcessing}
        onInteractOutside={(e) => isProcessing && e.preventDefault()}
      >
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
            <div className="flex items-center justify-between gap-2">
              <DialogClose
                style={getButtonColors(currentColorName, "outline")}
                className={`${BASIC_BUTTON_CLASS_NAMES} elementColors`}
                type="button"
                disabled={isProcessing}
              >
                Cancel
              </DialogClose>
              <AnimatedEmoji
                canAnimate
                emojiVariant="pleading"
                className="w-16 h-16"
              />
              <Button variant="destructive" disabled={isProcessing}>
                {isProcessing ? (
                  <div className="flex gap-2">
                    <Loading size="sm" />
                    Deleting
                  </div>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
