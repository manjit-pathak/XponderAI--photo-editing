import React from "react";
import { ChatInterface } from "./ChatInterface";
import { Button } from "./ui/button";
import { Upload, Images } from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-screen bg-[#0F2A27] flex flex-col overflow-hidden">
      <header className="border-b border-[#1A3B37]">
        <div className="px-8 py-3">
          <h1 className="text-6xl font-bold text-white tracking-tight">Sobi</h1>
          <p className="mt-1 text-sm text-[#00A693]">
            AI Image Enhancement Assistant
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 pt-1 pb-4 overflow-hidden">
        <div className="w-full max-w-[90%] mx-auto h-full flex flex-col">
          <div className="flex-1">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}
