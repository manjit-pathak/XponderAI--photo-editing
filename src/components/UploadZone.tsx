import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";

interface UploadZoneProps {
  onFileSelect?: (file: File) => void;
  isLoading?: boolean;
}

const UploadZone = ({
  onFileSelect = () => {},
  isLoading = false,
}: UploadZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12
          flex flex-col items-center justify-center
          transition-colors duration-200
          min-h-[400px] bg-white/90 backdrop-blur-sm
          ${isDragActive ? "border-teal-500 bg-teal-50" : "border-gray-300 hover:border-teal-400"}
          ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-4 bg-teal-50 rounded-full">
            {isDragActive ? (
              <Upload className="w-12 h-12 text-teal-600" />
            ) : (
              <ImageIcon className="w-12 h-12 text-teal-600" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-700">
              {isDragActive ? "Drop your image here" : "Upload your image"}
            </h3>
            <p className="text-sm text-gray-500">
              Drag and drop your image here, or click to select
            </p>
          </div>

          <Button
            variant="default"
            className="bg-teal-600 hover:bg-teal-700 mt-4"
            disabled={isLoading}
          >
            Select Image
          </Button>

          <p className="text-xs text-gray-400 mt-2">
            Supported formats: JPEG, PNG, WebP
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
