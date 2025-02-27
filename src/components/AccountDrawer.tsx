import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { LogOut, Settings, User, Bell, Moon, HelpCircle } from "lucide-react";

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AccountDrawer({ isOpen, onClose, user }: AccountDrawerProps) {
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[350px] sm:w-[400px] bg-[#0F2A27] border-[#1A3B37] text-white">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-[#00A693]">Account</SheetTitle>
          <SheetDescription className="text-gray-400">
            Manage your account settings and preferences
          </SheetDescription>
        </SheetHeader>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-[#00A693]">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-[#00A693] text-white text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{currentUser.name}</h3>
            <p className="text-sm text-gray-400">{currentUser.email}</p>
            <Button
              variant="link"
              className="p-0 h-auto text-[#00A693] text-sm"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <Separator className="my-4 bg-[#1A3B37]" />

        {/* Account Settings */}
        <div className="space-y-6">
          <h4 className="text-sm font-medium text-[#00A693] uppercase tracking-wider">
            Account Settings
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-[#00A693]" />
                <Label htmlFor="profile-visibility" className="text-white">
                  Profile Visibility
                </Label>
              </div>
              <Switch id="profile-visibility" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-[#00A693]" />
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
          <h4 className="text-sm font-medium text-[#00A693] uppercase tracking-wider">
            App Settings
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="h-5 w-5 text-[#00A693]" />
                <Label htmlFor="dark-mode" className="text-white">
                  Dark Mode
                </Label>
              </div>
              <Switch id="dark-mode" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-[#00A693]" />
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
            <HelpCircle className="mr-2 h-5 w-5 text-[#00A693]" />
            Help & Support
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-[#1A3B37] hover:text-white"
          >
            <LogOut className="mr-2 h-5 w-5 text-[#00A693]" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
