import React, { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { AccountDialog } from "./AccountDialog";
import { useThemeStore } from "@/lib/store/themeStore";

interface AccountPopoverProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AccountPopover({ user }: AccountPopoverProps) {
  const [showAccountDialog, setShowAccountDialog] = useState(false);

  // Default user if none provided
  const defaultUser = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const currentUser = user || defaultUser;
  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        style={{ color: useThemeStore.getState().accentColor }}
        className="hover:text-[#008F7D] hover:bg-[#1A3B37] rounded-full h-10 w-10"
        onClick={() => setShowAccountDialog(true)}
      >
        <User className="h-5 w-5" />
      </Button>

      <AccountDialog
        isOpen={showAccountDialog}
        onClose={() => setShowAccountDialog(false)}
        user={currentUser}
      />
    </>
  );
}
