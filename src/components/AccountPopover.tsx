import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { LogOut, Settings, User, Bell, Moon, HelpCircle } from "lucide-react";

interface AccountPopoverProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AccountPopover({ user }: AccountPopoverProps) {
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#00A693] hover:text-[#008F7D] hover:bg-[#1A3B37] rounded-full h-10 w-10"
        >
          <User className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] mr-6 bg-[#0F2A27] border-[#1A3B37] text-white p-4"
        align="end"
        sideOffset={16}
      >
        {/* User Profile Section */}
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-[#00A693]">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-[#00A693] text-white text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base font-medium">{currentUser.name}</h3>
            <p className="text-xs text-gray-400">{currentUser.email}</p>
            <Button
              variant="link"
              className="p-0 h-auto text-[#00A693] text-xs"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <Separator className="my-3 bg-[#1A3B37]" />

        {/* Account Settings */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-[#00A693] uppercase tracking-wider">
            ACCOUNT SETTINGS
          </h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-[#00A693]" />
                <Label
                  htmlFor="profile-visibility"
                  className="text-white text-xs"
                >
                  Profile Visibility
                </Label>
              </div>
              <Switch id="profile-visibility" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-[#00A693]" />
                <Label htmlFor="notifications" className="text-white text-xs">
                  Notifications
                </Label>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
          </div>
        </div>

        <Separator className="my-3 bg-[#1A3B37]" />

        {/* App Settings */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-[#00A693] uppercase tracking-wider">
            APP SETTINGS
          </h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4 text-[#00A693]" />
                <Label htmlFor="dark-mode" className="text-white text-xs">
                  Dark Mode
                </Label>
              </div>
              <Switch id="dark-mode" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-[#00A693]" />
                <Label htmlFor="auto-save" className="text-white text-xs">
                  Auto-Save Edits
                </Label>
              </div>
              <Switch id="auto-save" defaultChecked />
            </div>
          </div>
        </div>

        <Separator className="my-3 bg-[#1A3B37]" />

        {/* Help & Support */}
        <div className="space-y-2 mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-white hover:bg-[#1A3B37] hover:text-white text-xs h-8"
          >
            <HelpCircle className="mr-2 h-4 w-4 text-[#00A693]" />
            Help & Support
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-white hover:bg-[#1A3B37] hover:text-white text-xs h-8"
          >
            <LogOut className="mr-2 h-4 w-4 text-[#00A693]" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
