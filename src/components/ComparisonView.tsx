import React from "react";
import EditingToolbar from "./EditingToolbar";
import ProcessingOverlay from "./ProcessingOverlay";

interface ComparisonViewProps {
  originalImage?: string;
  processedImage?: string;
  isProcessing?: boolean;
  processingProgress?: number;
  onCrop?: () => void;
  onResize?: () => void;
  onDownload?: (format: string) => void;
}

const ComparisonView = ({
  originalImage = "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
  processedImage = "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
  isProcessing = false,
  processingProgress = 0,
  onCrop = () => {},
  onResize = () => {},
  onDownload = () => {},
}: ComparisonViewProps) => {
  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 h-full overflow-hidden">
        {/* Original Image Panel */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden relative">
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            Original
          </div>
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Processed Image Panel */}
        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden relative">
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            Processed
          </div>
          <img
            src={processedImage}
            alt="Processed"
            className="w-full h-full object-contain"
          />
          {isProcessing && (
            <ProcessingOverlay
              progress={processingProgress}
              isVisible={isProcessing}
            />
          )}
        </div>
      </div>

      <EditingToolbar
        onCrop={onCrop}
        onResize={onResize}
        onDownload={onDownload}
      />
    </div>
  );
};

export default ComparisonView;
