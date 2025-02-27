import React, { useRef } from "react";

// Simple animated background with CSS instead of Three.js
export function MovingShapes() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0F2A27]">
      {/* Animated shapes */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            backgroundColor: i % 2 === 0 ? "#00A693" : "#008F7D",
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `scale(${Math.random() * 0.8 + 0.2})`,
            animation: `float-${i} ${Math.random() * 20 + 10}s infinite ease-in-out`,
          }}
        />
      ))}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float-0 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(100px, 50px) rotate(10deg);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-50px, 100px) rotate(-5deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(70px, -120px) rotate(15deg);
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-120px, -50px) rotate(-15deg);
          }
        }
        @keyframes float-4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(100px, 100px) rotate(20deg);
          }
        }
        @keyframes float-5 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-80px, 80px) rotate(-10deg);
          }
        }
        @keyframes float-6 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(60px, -90px) rotate(8deg);
          }
        }
        @keyframes float-7 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-110px, -70px) rotate(-12deg);
          }
        }
        @keyframes float-8 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(90px, 60px) rotate(18deg);
          }
        }
        @keyframes float-9 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-60px, 110px) rotate(-7deg);
          }
        }
      `}</style>
    </div>
  );
}
