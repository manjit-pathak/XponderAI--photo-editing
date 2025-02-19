import React from "react";
import { Progress } from "./ui/progress";
import { Loader2 } from "lucide-react";

interface ProcessingOverlayProps {
  progress?: number;
  message?: string;
  isVisible?: boolean;
}

import { motion } from "framer-motion";

const ProcessingOverlay = ({
  progress = 0,
  message = "Processing your image...",
  isVisible = true,
}: ProcessingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
    >
      <motion.div
        className="flex flex-col items-center space-y-6 p-8 rounded-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
        <div className="text-xl font-semibold text-teal-800">{message}</div>
        <div className="w-64">
          <Progress value={progress} className="h-2" />
        </div>
        <div className="text-sm text-teal-600">{progress}% Complete</div>
      </motion.div>
    </motion.div>
  );
};

export default ProcessingOverlay;
