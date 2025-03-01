import React, { useState, useRef, useEffect } from "react";
import { ChatInterface } from "./ChatInterface";
import { AccountPopover } from "./AccountPopover";
import { ConversationHistory } from "./ConversationHistory";
import { SettingsPanel } from "./SettingsPanel";
import { MovingShapes } from "./3d/MovingShapes";
import { useThemeStore } from "@/lib/store/themeStore";

export default function HomePage() {
  const [selectedConversationId, setSelectedConversationId] = useState("1");
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const historyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const settingsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    // Left side - History panel
    if (e.clientX < 50) {
      setShowHistory(true);
      if (historyTimeoutRef.current) {
        clearTimeout(historyTimeoutRef.current);
        historyTimeoutRef.current = null;
      }
    } else if (
      e.clientX > 350 &&
      showHistory &&
      !historyRef.current?.contains(e.target as Node)
    ) {
      if (!historyTimeoutRef.current) {
        historyTimeoutRef.current = setTimeout(() => {
          setShowHistory(false);
          historyTimeoutRef.current = null;
        }, 300);
      }
    }

    // Right side - Settings panel
    if (e.clientX > window.innerWidth - 50) {
      setShowSettings(true);
      if (settingsTimeoutRef.current) {
        clearTimeout(settingsTimeoutRef.current);
        settingsTimeoutRef.current = null;
      }
    } else if (
      e.clientX < window.innerWidth - 350 &&
      showSettings &&
      !settingsRef.current?.contains(e.target as Node)
    ) {
      if (!settingsTimeoutRef.current) {
        settingsTimeoutRef.current = setTimeout(() => {
          setShowSettings(false);
          settingsTimeoutRef.current = null;
        }, 300);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (historyTimeoutRef.current) clearTimeout(historyTimeoutRef.current);
      if (settingsTimeoutRef.current) clearTimeout(settingsTimeoutRef.current);
    };
  }, [showHistory, showSettings]);

  return (
    <div className="h-screen bg-[#0F2A27] flex flex-col overflow-hidden relative">
      {/* Background 3D Effects */}
      <div className="absolute inset-0 z-0 opacity-30">
        <MovingShapes />
      </div>

      <header className="relative z-10">
        <div className="px-8 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-6xl font-bold text-white tracking-tight">
              Sobi
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: useThemeStore.getState().accentColor }}
            >
              AI Image Enhancement Assistant
            </p>
          </div>

          <div>
            {/* Account Popover */}
            <AccountPopover
              user={{
                name: "Alex Johnson",
                email: "alex@example.com",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
              }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Conversation History Sidebar */}
        <div
          ref={historyRef}
          className={`absolute top-0 left-0 h-full z-20 transform transition-transform duration-300 ease-in-out ${showHistory ? "translate-x-0" : "-translate-x-full"}`}
        >
          <ConversationHistory
            selectedConversationId={selectedConversationId}
            onSelectConversation={(id) => {
              setSelectedConversationId(id);
              setShowHistory(false);
            }}
            onDeleteConversation={(id) => {
              console.log(`Delete conversation ${id}`);
              // In a real app, you would delete the conversation here
            }}
          />
        </div>

        {/* Settings Panel */}
        <div
          ref={settingsRef}
          className={`absolute top-0 right-0 h-full z-20 transform transition-transform duration-300 ease-in-out ${showSettings ? "translate-x-0" : "translate-x-full"}`}
        >
          <SettingsPanel onClose={() => setShowSettings(false)} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-4 pt-1 pb-4 overflow-hidden">
          <div className="w-full max-w-[70%] mx-auto h-full flex flex-col">
            <div className="flex-1">
              <ChatInterface />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
