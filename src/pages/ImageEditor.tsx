import React, { useState } from "react";
import { applyCinematicEffect } from "../lib/imageProcessing";
import UploadZone from "../components/UploadZone";
import ComparisonView from "../components/ComparisonView";

const ImageEditor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev < 30) return prev + 3;
          if (prev < 60) return prev + 2;
          if (prev < 85) return prev + 1;
          return prev;
        });
      }, 100);

      // Process the image
      const processedImage = await applyCinematicEffect(file);
      setProcessedImageUrl(processedImage);

      // Complete progress
      clearInterval(progressInterval);
      setProcessingProgress(100);
      setIsProcessing(false);
    } catch (error) {
      console.error("Error processing image:", error);
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const handleCrop = () => {
    console.log("Crop action");
  };

  const handleResize = () => {
    console.log("Resize action");
  };

  const handleDownload = async (format: string) => {
    if (!processedImageUrl) return;

    try {
      // Create a canvas to handle format conversion
      const img = new Image();
      img.src = processedImageUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convert to the requested format
      const mimeType = `image/${format}`;
      const quality = format === "png" ? 1 : 0.95;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      // Create download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `processed-image.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="h-screen bg-[#0f2a27] flex flex-col overflow-hidden">
      <header className="bg-[#0f2a27] border-b border-teal-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              XponderAI
            </h1>
            <p className="mt-2 text-sm text-teal-300">
              Intelligent Photo Enhancement
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-teal-300 hover:text-teal-200">
              Features
            </a>
            <a href="#pricing" className="text-teal-300 hover:text-teal-200">
              Pricing
            </a>
            <a href="#about" className="text-teal-300 hover:text-teal-200">
              About
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center overflow-hidden">
        {!selectedFile ? (
          <UploadZone
            onFileSelect={handleFileSelect}
            isLoading={isProcessing}
          />
        ) : (
          <ComparisonView
            originalImage={
              selectedFile ? URL.createObjectURL(selectedFile) : undefined
            }
            processedImage={processedImageUrl || undefined}
            isProcessing={isProcessing}
            processingProgress={processingProgress}
            onCrop={handleCrop}
            onResize={handleResize}
            onDownload={handleDownload}
            onUpload={() => {
              setSelectedFile(null);
              setProcessedImageUrl("");
              setProcessingProgress(0);
              setIsProcessing(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ImageEditor;
