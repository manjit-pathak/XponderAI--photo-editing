import React, { useState } from "react";
import UploadZone from "../components/UploadZone";
import ComparisonView from "../components/ComparisonView";

const ImageEditor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Simulate processing
    setIsProcessing(true);
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleCrop = () => {
    console.log("Crop action");
  };

  const handleResize = () => {
    console.log("Resize action");
  };

  const handleDownload = (format: string) => {
    console.log("Download in format:", format);
  };

  return (
    <div className="min-h-screen bg-[#0f2a27]">
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
      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center h-[calc(100vh-88px)] overflow-hidden">
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
            processedImage={
              selectedFile ? URL.createObjectURL(selectedFile) : undefined
            }
            isProcessing={isProcessing}
            processingProgress={processingProgress}
            onCrop={handleCrop}
            onResize={handleResize}
            onDownload={handleDownload}
          />
        )}
      </main>
    </div>
  );
};

export default ImageEditor;
