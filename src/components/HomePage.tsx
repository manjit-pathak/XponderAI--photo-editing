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
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1">
            <ChatInterface />
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              className="bg-white text-[#00A693] hover:bg-white/90 border-0 gap-2"
              onClick={() => document.getElementById("single-upload").click()}
            >
              <Upload className="w-4 h-4" />
              Single Image
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 gap-2"
              onClick={() => document.getElementById("batch-upload").click()}
            >
              <Images className="w-4 h-4" />
              Batch Process
            </Button>
          </div>

          <input
            type="file"
            id="single-upload"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Handle single file upload
              }
            }}
          />
          <input
            type="file"
            id="batch-upload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files?.length) {
                // Handle batch file upload
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
