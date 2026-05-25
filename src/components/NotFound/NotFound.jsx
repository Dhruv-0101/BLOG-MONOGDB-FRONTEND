import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaQuestionCircle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 overflow-hidden">
      {/* Background ambient glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-150 to-purple-100 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-60 pointer-events-none z-0" />

      {/* Decorative floating indicators */}
      <div className="absolute top-20 left-[15%] text-indigo-400/20 text-7xl select-none animate-float hidden md:block" style={{ animationDelay: "0.5s" }}>
        ?
      </div>
      <div className="absolute bottom-24 right-[15%] text-purple-400/20 text-8xl select-none animate-float hidden md:block" style={{ animationDelay: "1.5s" }}>
        !
      </div>
      <div className="absolute top-1/3 right-[10%] text-pink-400/20 text-6xl select-none animate-float hidden md:block" style={{ animationDelay: "2.5s" }}>
        404
      </div>

      {/* Glassmorphic content container */}
      <div className="relative w-full max-w-lg bg-white/75 backdrop-blur-xl border border-white/80 shadow-2xl p-8 md:p-12 rounded-3xl z-10 text-center animate-scale-in">
        
        {/* Animated Question Mark Icon */}
        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 items-center justify-center text-indigo-600 shadow-sm mb-6 animate-pulse-ring">
          <FaQuestionCircle size="32" className="animate-float" />
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 select-none">
          404
        </h1>

        {/* Status Message */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 mb-3">
          Lost in Space?
        </h2>
        
        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <FaHome size="16" />
            Back to Home
          </Link>
          
          <Link
            to="/posts"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Explore Articles
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
