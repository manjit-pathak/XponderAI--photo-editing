import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { LogOut, Settings, User, Bell, Moon, HelpCircle } from "lucide-react";
import { useThemeStore } from "@/lib/store/themeStore";

interface AccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AccountDialog({ isOpen, onClose, user }: AccountDialogProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0F2A27] border-[#1A3B37] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle style={{ color: useThemeStore.getState().accentColor }}>
            Account Settings
          </DialogTitle>
        </DialogHeader>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4 mb-6">
          <Avatar
            className="h-16 w-16 border-2"
            style={{ borderColor: useThemeStore.getState().accentColor }}
          >
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback
              className="text-white text-xl"
              style={{ backgroundColor: useThemeStore.getState().accentColor }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{currentUser.name}</h3>
            <p className="text-sm text-gray-400">{currentUser.email}</p>
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              style={{ color: useThemeStore.getState().accentColor }}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <Separator className="my-4 bg-[#1A3B37]" />

        {/* Account Settings */}
        <div className="space-y-6">
          <h4
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: useThemeStore.getState().accentColor }}
          >
            Account Settings
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User
                  className="h-5 w-5"
                  style={{ color: useThemeStore.getState().accentColor }}
                />
                <Label htmlFor="profile-visibility" className="text-white">
                  Profile Visibility
                </Label>
              </div>
              <Switch id="profile-visibility" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell
                  className="h-5 w-5"
                  style={{ color: useThemeStore.getState().accentColor }}
                />
                <Label htmlFor="notifications" className="text-white">
                  Notifications
                </Label>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
          </div>
        </div>

        <Separator className="my-4 bg-[#1A3B37]" />

        {/* App Settings */}
        <div className="space-y-6">
          <h4
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: useThemeStore.getState().accentColor }}
          >
            App Settings
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon
                  className="h-5 w-5"
                  style={{ color: useThemeStore.getState().accentColor }}
                />
                <Label htmlFor="dark-mode" className="text-white">
                  Dark Mode
                </Label>
              </div>
              <Switch
                id="dark-mode"
                defaultChecked
                onCheckedChange={(checked) => {
                  useThemeStore.getState().setDarkMode(checked);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings
                  className="h-5 w-5"
                  style={{ color: useThemeStore.getState().accentColor }}
                />
                <Label htmlFor="auto-save" className="text-white">
                  Auto-Save Edits
                </Label>
              </div>
              <Switch id="auto-save" defaultChecked />
            </div>
          </div>
        </div>

        <Separator className="my-4 bg-[#1A3B37]" />

        {/* Help & Support */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#1A3B37] hover:text-white"
          >
            <HelpCircle
              className="mr-2 h-5 w-5"
              style={{ color: useThemeStore.getState().accentColor }}
            />
            Help & Support
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#1A3B37] hover:text-white"
          >
            <LogOut
              className="mr-2 h-5 w-5"
              style={{ color: useThemeStore.getState().accentColor }}
            />
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
