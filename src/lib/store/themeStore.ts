import { create } from "zustand";

type ThemeStore = {
  accentColor: string;
  setAccentColor: (color: string) => void;
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  accentColor: "#00A693",
  setAccentColor: (color: string) => {
    document.documentElement.style.setProperty("--accent-color", color);
    return set({ accentColor: color });
  },
  isDarkMode: true,
  setDarkMode: (isDark: boolean) => {
    document.documentElement.classList.toggle("dark", isDark);
    return set({ isDarkMode: isDark });
  },
}));
