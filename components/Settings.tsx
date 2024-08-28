import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui";
import { useSettings } from "@/hooks/useSettings";
import { SettingsUserNameForm } from "./SettingsUserNameForm";
import { SettingsDeleteUser } from "./SettingsDeleteUser";

export const Settings = () => {
  const { userName, password, logOut, handleSubmitDelete } = useSettings();

  return (
    <Sheet onOpenChange={userName.clearFields}>
      <SheetTrigger className="text-2xl outline-none duration-300 hover:rotate-12">
        ⚙️
      </SheetTrigger>
      <SheetContent
        side={"top"}
        className="mx-auto max-w-[1200px] rounded-b-xl"
      >
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>{userName.settingsDesc}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-start">
          <Button
            variant="outline"
            className="self-end"
            onClick={async () => await logOut()}
          >
            Logout
          </Button>

          <SettingsUserNameForm userName={userName} />

          <SettingsDeleteUser
            password={password}
            handleSubmitDelete={handleSubmitDelete}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
