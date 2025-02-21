import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Settings2 } from "lucide-react";
import { ImageEditor } from "@/lib/ai/imageEditor";
import { AVAILABLE_MODELS } from "@/lib/ai/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const imageEditor = new ImageEditor();

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<string>(
    AVAILABLE_MODELS[0].id,
  );
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string; isStreaming?: boolean }>
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI image editing assistant. How can I help you today?",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
    {
      role: "assistant",
      content:
        "Hi! I'm your AI image editing assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      imageEditor.setModel(selectedModel);
      const { response, suggestedFilters } =
        await imageEditor.processUserRequest(input);
      if (response) {
        // Add empty assistant message that will be streamed
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "", isStreaming: true },
        ]);

        // Stream the response word by word
        const words = response.split(" ");
        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            lastMessage.content = words.slice(0, i + 1).join(" ");
            return newMessages;
          });
        }

        // Mark streaming as complete
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.isStreaming = false;
          return newMessages;
        });
      }

      // TODO: Implement filter application logic here
      console.log("Suggested filters:", suggestedFilters);
    } catch (error) {
      console.error("Error processing request:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-[#0B1C1A] rounded-lg overflow-hidden"
      style={{ maxHeight: "calc(100vh - 180px)" }}
    >
      <div className="p-4 border-b border-[#1A3B37] bg-[#0B1C1A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-[#00A693]" />
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[180px] bg-[#0F2A27] border-[#1A3B37] text-white">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent className="bg-[#0F2A27] border-[#1A3B37]">
              {AVAILABLE_MODELS.map((model) => (
                <SelectItem
                  key={model.id}
                  value={model.id}
                  className="text-white hover:bg-[#1A3B37] focus:bg-[#1A3B37]"
                >
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-[#00A693] text-white"
                  : "bg-[#0F2A27] text-white"
              }`}
            >
              {message.content}
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-[#00A693] animate-pulse" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[#1A3B37] bg-[#0B1C1A]">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Ask Sobi about image editing..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
            className="flex-1 bg-[#0F2A27] border-[#1A3B37] text-white placeholder-[#4A5A58]"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#00A693] hover:bg-[#008F7D] text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
