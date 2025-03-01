import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Clock, MessageSquare, Trash2 } from "lucide-react";
import { useThemeStore } from "@/lib/store/themeStore";

interface Conversation {
  id: string;
  title: string;
  date: string;
  preview: string;
}

interface ConversationHistoryProps {
  conversations?: Conversation[];
  onSelectConversation?: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
  selectedConversationId?: string;
}

export function ConversationHistory({
  conversations = [],
  onSelectConversation = () => {},
  onDeleteConversation = () => {},
  selectedConversationId = "",
}: ConversationHistoryProps) {
  // Default conversations if none provided
  const defaultConversations: Conversation[] = [
    {
      id: "1",
      title: "Landscape Photo Enhancement",
      date: "Today, 2:30 PM",
      preview: "Increased brightness and contrast...",
    },
    {
      id: "2",
      title: "Portrait Color Correction",
      date: "Yesterday, 10:15 AM",
      preview: "Applied cinematic color grading...",
    },
    {
      id: "3",
      title: "Product Photo Editing",
      date: "May 15, 2023",
      preview: "Adjusted white balance and shadows...",
    },
  ];

  const displayConversations =
    conversations.length > 0 ? conversations : defaultConversations;

  return (
    <div className="h-full w-[300px] bg-[#0B1C1A] border-r border-[#1A3B37] flex flex-col shadow-xl">
      <div className="p-4 border-b border-[#1A3B37]">
        <h2
          style={{ color: useThemeStore.getState().accentColor }}
          className="font-medium text-lg"
        >
          Conversation History
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {displayConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer group transition-colors ${selectedConversationId === conversation.id ? "bg-[#1A3B37]" : "hover:bg-[#1A3B37]/50"}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-medium truncate">
                    {conversation.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{conversation.date}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">
                {conversation.preview}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-[#1A3B37]">
        <Button
          variant="outline"
          className="w-full border-[#1A3B37] hover:bg-[#1A3B37] hover:text-white"
          style={{ color: useThemeStore.getState().accentColor }}
          onClick={() => onSelectConversation("new")}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
    </div>
  );
}
