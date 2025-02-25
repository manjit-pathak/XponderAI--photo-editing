import React, { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { filters } from "@/lib/filters";

interface ImageEditorPanelProps {
  originalImage: string;
  onImageProcessed: (processedImageUrl: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasMultipleImages?: boolean;
  imageInfo?: {
    current: number;
    total: number;
  };
}

export function ImageEditorPanel({
  originalImage,
  onImageProcessed,
  onNext,
  onPrevious,
  hasMultipleImages,
  imageInfo,
}: ImageEditorPanelProps) {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [previewImage, setPreviewImage] = useState(originalImage);

  const processImage = async () => {
    const img = new Image();
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = originalImage;
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Apply filters
    if (brightness !== 0) {
      imageData = await filters.brightness.apply(imageData, {
        level: brightness,
      });
    }
    if (contrast !== 0) {
      imageData = await filters.contrast.apply(imageData, { level: contrast });
    }

    ctx.putImageData(imageData, 0, 0);
    const processedBase64 = canvas.toDataURL("image/jpeg", 0.95);
    onImageProcessed(processedBase64);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      processImage();
    }, 10);
    return () => clearTimeout(debounceTimeout);
  }, [brightness, contrast]);

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {hasMultipleImages && (
        <div className="flex justify-between items-center text-white mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="text-[#00A693] hover:text-[#008F7D] hover:bg-[#1A3B37]"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-[#00A693]">
            Image {imageInfo?.current} of {imageInfo?.total}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="text-[#00A693] hover:text-[#008F7D] hover:bg-[#1A3B37]"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
      <div className="flex-1 bg-black/20 rounded-lg overflow-hidden">
        <img
          src={previewImage}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-white">Brightness</Label>
            <span className="text-[#00A693]">{brightness}%</span>
          </div>
          <Slider
            value={[brightness]}
            onValueChange={(value) => setBrightness(value[0])}
            min={-100}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#00A693]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-white">Contrast</Label>
            <span className="text-[#00A693]">{contrast}%</span>
          </div>
          <Slider
            value={[contrast]}
            onValueChange={(value) => setContrast(value[0])}
            min={-100}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-[#00A693]"
          />
        </div>
      </div>
    </div>
  );
}
