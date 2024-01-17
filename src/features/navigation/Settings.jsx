import { Settings as SettingsIcon } from "lucide-react";
import Button from "@/ui/Button";

export default function Settings() {
  return (
    <div className="flex items-center justify-end">
      {/** Add settings modal on click*/}
      <Button styles="mr-8 flex items-center">
        <SettingsIcon size="22" />
        <span>Settings</span>
      </Button>
    </div>
  );
}
