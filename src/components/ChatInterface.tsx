import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageCircle, Send, Settings2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageEditor } from "@/lib/ai/imageEditor";
import { AVAILABLE_MODELS, SELECTED_MODEL } from "@/lib/ai/config";

const imageEditor = new ImageEditor();

export function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState<string>(
    AVAILABLE_MODELS[0].id,
  );
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([
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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response },
        ]);
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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-teal-600 hover:bg-teal-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[450px] sm:w-[600px] h-full flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4">
          <SheetTitle>AI Image Editor Assistant</SheetTitle>
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2">
          <Input
            placeholder="Ask about image editing..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
