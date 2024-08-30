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
import { useUiColors } from "@/context/ColorsContext";
import { SettingsUiColors } from "./SettingsUiColors";

export const Settings = () => {
  const { userName, password, logOut, handleSubmitDelete } = useSettings();
  const { currentColors, resetColor } = useUiColors();

  const handleLogOut = async () => {
    await logOut();
    resetColor();
  };

  return (
    <Sheet onOpenChange={userName.clearFields}>
      <SheetTrigger className="text-2xl outline-none">
        <i
          style={{
            "--text-color": currentColors[6],
            "--text-hover-color": currentColors[5],
          }}
          className="fa-solid fa-gear duration-300 hover:rotate-90 textColors"
        />
      </SheetTrigger>
      <SheetContent
        side={"top"}
        className="mx-auto max-w-[1200px] max-h-[95%] overflow-auto rounded-b-xl"
      >
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>{userName.settingsDesc}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-start">
          <Button variant="outline" className="self-end" onClick={handleLogOut}>
            Logout
          </Button>

          <SettingsUserNameForm userName={userName} />
          <SettingsUiColors />
          <SettingsDeleteUser
            password={password}
            handleSubmitDelete={handleSubmitDelete}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
