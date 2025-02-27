import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Send,
  Settings2,
  Image as ImageIcon,
  Download,
  Sliders,
} from "lucide-react";
import { ImagePreviewDialog } from "./ImagePreviewDialog";
import { ImageEditorPanel } from "./ImageEditorPanel";
import { ImageEditor } from "@/lib/ai/imageEditor";
import { AVAILABLE_MODELS } from "@/lib/ai/config";
import { imageStore, type StoredImage } from "@/lib/store/imageStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const imageEditor = new ImageEditor();

export function ChatInterface() {
  const [showPreview, setShowPreview] = useState(false);
  const [showAdvancedEdit, setShowAdvancedEdit] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImage, setCurrentImage] = useState<StoredImage | null>(null);
  const [uploadedImages, setUploadedImages] = useState<StoredImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<string>(
    AVAILABLE_MODELS[0].id,
  );
  const [messages, setMessages] = useState<
    Array<{
      role: string;
      content: string;
      isStreaming?: boolean;
      imageUrl?: string;
      isPreviewButton?: boolean;
    }>
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm Sobi, your AI image editing assistant. Upload an image and I'll help you enhance it!",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const images = imageStore.getImages();
    setUploadedImages(images);
  }, []);

  const handleImageUpload = async (file: File) => {
    try {
      const storedImage = await imageStore.addImage(file);
      setUploadedImages((prev) => [...prev, storedImage]);
      setCurrentImage(storedImage);
      setCurrentImageIndex((prev) => prev + 1);
      imageEditor.setCurrentImage(storedImage.data);
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          imageUrl: storedImage.data,
          content: "",
        },
        {
          role: "assistant",
          content: `I see you've uploaded ${file.name}. What would you like me to do with it? I can help with brightness, contrast, and other adjustments.`,
        },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I had trouble processing that image. Could you try uploading it again?",
        },
      ]);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      imageEditor.setModel(selectedModel);
      const { response, suggestedFilters } =
        await imageEditor.processUserRequest(input);

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

      // Process image if we have filters to apply
      if (currentImage && suggestedFilters.length > 0) {
        // Convert base64 to ImageData
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = currentImage.data;
        });

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Apply filters
        const processedImageData = await imageEditor.applyFilters(
          imageData,
          suggestedFilters,
        );
        ctx.putImageData(processedImageData, 0, 0);

        // Convert back to base64
        const processedBase64 = canvas.toDataURL("image/jpeg", 0.95);

        setProcessedImageUrl(processedBase64);

        // Add preview button only once
        setMessages((prev) => {
          // Check if we already have a message with preview buttons
          const hasPreviewButton = prev.some((msg) => msg.isPreviewButton);
          if (hasPreviewButton) {
            return prev;
          }
          return [
            ...prev,
            {
              role: "assistant",
              content: "Here are your options for this edited image:",
              isPreviewButton: true,
            },
          ];
        });
      }
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
      className="flex h-full gap-8 overflow-hidden w-full"
      style={{ maxHeight: "calc(100vh - 180px)" }}
    >
      {/* Chat Section */}
      <div
        className={`flex flex-col bg-[#0B1C1A] rounded-lg overflow-hidden transition-all duration-300 ${currentImage && showAdvancedEdit ? "w-[55%]" : "w-full"}`}
      >
        <div className="p-4 border-b border-[#1A3B37] bg-[#0B1C1A] flex items-center justify-between">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00A693] hover:text-[#008F7D] hover:bg-[#1A3B37]"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
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
                <div className="space-y-2">
                  {message.imageUrl ? (
                    <img
                      src={message.imageUrl}
                      alt="Uploaded"
                      className="max-w-[200px] max-h-[150px] w-auto h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      {message.content}
                      {message.isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-[#00A693] animate-pulse" />
                      )}
                    </>
                  )}
                  {message.isPreviewButton && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => setShowPreview(true)}
                        className="bg-[#00A693] hover:bg-[#008F7D] gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => setShowAdvancedEdit(!showAdvancedEdit)}
                        className="bg-[#1A3B37] hover:bg-[#2A4B47] gap-2"
                      >
                        <Sliders className="h-4 w-4" />
                        Advanced Edit
                      </Button>
                      <Button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = processedImageUrl;
                          link.download =
                            "processed-" + (currentImage?.name || "image.jpg");
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="bg-[#1A3B37] hover:bg-[#2A4B47] gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
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

      {/* Image Editor Section */}
      {currentImage && showAdvancedEdit && (
        <div className="w-[45%] bg-[#0F2A27] rounded-lg overflow-hidden transition-all duration-300 flex flex-col h-full">
          <div className="p-4 border-b border-[#1A3B37] flex justify-between items-center">
            <h3 className="text-white font-medium">Advanced Image Editor</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedEdit(false)}
              className="text-[#00A693] hover:text-white hover:bg-[#1A3B37]"
            >
              Close
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ImageEditorPanel
              originalImage={currentImage.data}
              onImageProcessed={setProcessedImageUrl}
              onNext={() => {
                const nextIndex =
                  (currentImageIndex + 1) % uploadedImages.length;
                setCurrentImageIndex(nextIndex);
                setCurrentImage(uploadedImages[nextIndex]);
                imageEditor.setCurrentImage(uploadedImages[nextIndex].data);
              }}
              onPrevious={() => {
                const prevIndex =
                  (currentImageIndex - 1 + uploadedImages.length) %
                  uploadedImages.length;
                setCurrentImageIndex(prevIndex);
                setCurrentImage(uploadedImages[prevIndex]);
                imageEditor.setCurrentImage(uploadedImages[prevIndex].data);
              }}
              hasMultipleImages={uploadedImages.length > 1}
              imageInfo={{
                current: currentImageIndex + 1,
                total: uploadedImages.length,
              }}
            />
          </div>
        </div>
      )}

      {/* Image Preview Dialog */}
      <ImagePreviewDialog
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        imageUrl={processedImageUrl || currentImage?.data || ""}
        onDownload={(imageUrl) => {
          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = "processed-" + (currentImage?.name || "image.jpg");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        title="Image Preview"
      />
    </div>
  );
}
