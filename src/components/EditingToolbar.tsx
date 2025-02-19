import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Crop, Download, Maximize2, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface EditingToolbarProps {
  onCrop?: () => void;
  onResize?: () => void;
  onDownload?: (format: string) => void;
  onUpload?: () => void;
}

const EditingToolbar = ({
  onCrop = () => {},
  onResize = () => {},
  onDownload = () => {},
  onUpload = () => {},
}: EditingToolbarProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2 border border-gray-200">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCrop}
              className="hover:bg-teal-50 hover:text-teal-600"
            >
              <Crop className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Crop Image</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onResize}
              className="hover:bg-teal-50 hover:text-teal-600"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Resize Image</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onUpload}
              className="hover:bg-teal-50 hover:text-teal-600"
            >
              <Upload className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload New Image</p>
          </TooltipContent>
        </Tooltip>

        <div className="h-6 w-px bg-gray-200 mx-2" />

        <div className="flex items-center gap-2">
          <Select
            defaultValue="png"
            onValueChange={(format) => onDownload(format)}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => onDownload("png")}
                disabled={!onDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download Image</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default EditingToolbar;
