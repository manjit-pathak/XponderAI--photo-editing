import React, { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { MovingShapes } from "./3d/MovingShapes";
import { SignupDialog } from "./SignupDialog";

// Background component with fallback
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 bg-[#0F2A27]">
      <MovingShapes />
      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F2A27] opacity-80"></div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="h-screen w-full relative bg-[#0F2A27] overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
          <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00A693] to-[#008F7D]">
            Sobi
          </h1>
          <p className="text-xl text-[#00A693]">
            Transform Your Images with AI-Powered Enhancement
          </p>
          <p className="text-gray-400 max-w-lg mx-auto">
            Experience intelligent photo editing with real-time adjustments and
            professional-grade enhancements.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button
              onClick={() => navigate("/editor")}
              className="bg-[#00A693] hover:bg-[#008F7D] text-white px-8 py-6 text-lg"
            >
              Try Now
            </Button>
            <Button
              variant="outline"
              className="border-[#00A693] text-[#00A693] hover:bg-[#00A693] hover:text-white px-8 py-6 text-lg"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      {/* Signup Dialog */}
      <SignupDialog isOpen={showSignup} onClose={() => setShowSignup(false)} />
    </div>
  );
}
