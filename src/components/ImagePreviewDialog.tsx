import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onDownload: () => void;
  title?: string;
}

export function ImagePreviewDialog({
  isOpen,
  onClose,
  imageUrl,
  onDownload,
  title = "Processed Image",
}: ImagePreviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-[#0F2A27] border-[#1A3B37] text-white p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative mt-4">
          <div className="aspect-auto max-h-[70vh] max-w-[90vw] overflow-hidden rounded-lg flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Processed"
              className="max-w-full max-h-[65vh] w-auto h-auto object-contain"
            />
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg">
            <Button
              className="bg-[#00A693] hover:bg-[#008F7D] shadow-lg"
              onClick={onDownload}
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
