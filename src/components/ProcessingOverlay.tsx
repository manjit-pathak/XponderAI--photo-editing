import React from "react";
import { Progress } from "./ui/progress";
import { Loader2 } from "lucide-react";

interface ProcessingOverlayProps {
  progress?: number;
  message?: string;
  isVisible?: boolean;
}

const ProcessingOverlay = ({
  progress = 0,
  message = "Processing your image...",
  isVisible = true,
}: ProcessingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6 p-8 rounded-lg">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
        <div className="text-xl font-semibold text-teal-800">{message}</div>
        <div className="w-64">
          <Progress value={progress} className="h-2" />
        </div>
        <div className="text-sm text-teal-600">{progress}% Complete</div>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
