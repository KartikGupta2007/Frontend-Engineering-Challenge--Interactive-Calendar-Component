import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

export default function VantaBackground({ children }) {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    // Vanta needs THREE to be global and mutable
    if (typeof window !== "undefined") {
      window.THREE = { 
        ...THREE,
        VertexColors: 1, // Legacy integer constant
        FaceColors: 2,
        NoColors: 0
      };
    }

    const initVanta = () => {
      // Handle potential import issues with Vite/ESM
      const vantaEffect = typeof NET === "function" ? NET : NET.default;
      
      if (!effectRef.current && vantaRef.current && typeof vantaEffect === "function") {
        try {
          effectRef.current = vantaEffect({
            el: vantaRef.current,
            THREE: window.THREE, // Use the shimmed version
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff3f81,       // Pink
            backgroundColor: 0x23153c, // Dark Purple
            points: 10,
            maxDistance: 20,
            spacing: 15
          });
        } catch (error) {
          console.error("Vanta initialization failed:", error);
        }
      }
    };

    initVanta();

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
      ref={vantaRef}
      className="vanta-container"
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        overflow: "hidden"
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
      `}</style>
    </div>

    <div className="relative z-10 w-full min-h-screen">
      {children}
    </div>
    </>
  );
}
