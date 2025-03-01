import React, { useState, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Settings,
  Save,
  Undo,
  Moon,
  Palette,
  Sliders,
  Image,
  Download,
} from "lucide-react";
import { useThemeStore } from "@/lib/store/themeStore";

interface SettingsPanelProps {
  onClose?: () => void;
}

export function SettingsPanel({ onClose = () => {} }: SettingsPanelProps) {
  const { accentColor, setAccentColor, isDarkMode } = useThemeStore();
  const [selectedColor, setSelectedColor] = useState(accentColor);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setAccentColor(color);
    document.documentElement.style.setProperty("--accent-color", color);
  };

  return (
    <div className="h-full w-[300px] bg-[#0B1C1A] border-l border-[#1A3B37] flex flex-col shadow-xl">
      <div className="p-4 border-b border-[#1A3B37]">
        <h2 style={{ color: accentColor }} className="font-medium text-lg">
          Settings
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Appearance Section */}
          <div className="space-y-4">
            <h3
              style={{ color: accentColor }}
              className="text-sm font-medium uppercase tracking-wider"
            >
              Appearance
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon style={{ color: accentColor }} className="h-5 w-5" />
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

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Palette style={{ color: accentColor }} className="h-5 w-5" />
                  <Label className="text-white">UI Accent Color</Label>
                </div>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {["#00A693", "#3B82F6", "#8B5CF6", "#EC4899", "#F97316"].map(
                    (color) => (
                      <div
                        key={color}
                        className="w-full aspect-square rounded-full cursor-pointer ring-2 ring-offset-2 ring-offset-[#0B1C1A] transition-all"
                        style={{
                          backgroundColor: color,
                          ringColor:
                            color === selectedColor ? color : "transparent",
                        }}
                        onClick={() => handleColorChange(color)}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Image Processing */}
          <div className="space-y-4">
            <h3
              style={{ color: accentColor }}
              className="text-sm font-medium uppercase tracking-wider"
            >
              Image Processing
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-white">Default Brightness</Label>
                  <span className="text-[#00A693]">0%</span>
                </div>
                <Slider
                  defaultValue={[0]}
                  min={-100}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-[#00A693]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-white">Default Contrast</Label>
                  <span className="text-[#00A693]">0%</span>
                </div>
                <Slider
                  defaultValue={[0]}
                  min={-100}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-[#00A693]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image style={{ color: accentColor }} className="h-5 w-5" />
                  <Label htmlFor="auto-enhance" className="text-white">
                    Auto-Enhance Images
                  </Label>
                </div>
                <Switch id="auto-enhance" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Save style={{ color: accentColor }} className="h-5 w-5" />
                  <Label htmlFor="auto-save" className="text-white">
                    Auto-Save Edits
                  </Label>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>
            </div>
          </div>

          {/* Export Settings */}
          <div className="space-y-4">
            <h3
              style={{ color: accentColor }}
              className="text-sm font-medium uppercase tracking-wider"
            >
              Export Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Default Format</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["PNG", "JPG", "WebP"].map((format) => (
                    <Button
                      key={format}
                      variant={format === "PNG" ? "default" : "outline"}
                      className={
                        format === "PNG"
                          ? "bg-[#00A693] hover:bg-[#008F7D]"
                          : "border-[#1A3B37] text-white hover:bg-[#1A3B37]"
                      }
                      size="sm"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-white">JPEG Quality</Label>
                  <span className="text-[#00A693]">90%</span>
                </div>
                <Slider
                  defaultValue={[90]}
                  min={10}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-[#00A693]"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-[#1A3B37]">
        <Button
          className="w-full"
          style={{ backgroundColor: accentColor, color: "white" }}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
