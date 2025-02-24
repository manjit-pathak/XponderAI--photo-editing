import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ImageEditorPanel } from "./ImageEditorPanel";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onDownload: (imageUrl: string) => void;
  title?: string;
}

export function ImagePreviewDialog({
  isOpen,
  onClose,
  imageUrl,
  onDownload,
  title = "Image Editor",
}: ImagePreviewDialogProps) {
  const [processedImageUrl, setProcessedImageUrl] = useState(imageUrl);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-[#0F2A27] border-[#1A3B37] text-white p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-[#00A693] font-medium">Original</div>
              <div className="aspect-auto h-[400px] bg-black/20 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-[#00A693] font-medium">Preview</div>
              <div className="aspect-auto h-[400px] bg-black/20 rounded-lg overflow-hidden">
                <img
                  src={processedImageUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <ImageEditorPanel
            originalImage={imageUrl}
            onImageProcessed={setProcessedImageUrl}
          />

          <div className="flex justify-end gap-2">
            <Button
              className="bg-[#00A693] hover:bg-[#008F7D] shadow-lg"
              onClick={() => onDownload(processedImageUrl)}
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
