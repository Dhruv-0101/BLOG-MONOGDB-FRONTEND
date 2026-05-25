import React from "react";
import { FaBlog } from "react-icons/fa";

const AuthCheckingComponent = () => {
  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-100 to-purple-100 rounded-full blur-[120px] opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-50 pointer-events-none z-0" />

      {/* Glassmorphic loading card */}
      <div className="relative w-full max-w-sm bg-white/70 backdrop-blur-xl border border-white shadow-xl p-8 rounded-3xl z-10 text-center flex flex-col items-center animate-scale-in">
        
        {/* StoryFlow Logo */}
        <div className="inline-flex w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-white shadow-md mb-6">
          <FaBlog size="20" />
        </div>

        {/* Premium Dual Spinning Loader */}
        <div className="relative w-16 h-16 mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
          
          {/* Inner ring spinning in reverse */}
          <div 
            className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-spin" 
            style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
          />
        </div>

        {/* Copy */}
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          Securing Session
        </h3>
        <p className="text-slate-400 text-xs font-semibold mt-1">
          Verifying authorization status, please wait...
        </p>

        {/* Pulsing loading bar */}
        <div className="w-24 h-1 bg-slate-100 rounded-full mt-6 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-shimmer" style={{ width: "50%" }} />
        </div>
      </div>
    </div>
  );
};

export default AuthCheckingComponent;
