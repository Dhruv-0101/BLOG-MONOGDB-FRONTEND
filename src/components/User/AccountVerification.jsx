import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaBlog } from "react-icons/fa";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyUserAccountAPI } from "../../APIServices/users/usersAPI";

const AccountVerifiedComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Get the token from the URL
  const { verifyToken } = useParams();
  
  const mutation = useMutation({
    mutationKey: ["verify-account"],
    mutationFn: verifyUserAccountAPI,
  });

  // Automatically trigger mutation on component load
  useEffect(() => {
    if (verifyToken) {
      mutation.mutate(verifyToken);
    }
  }, [verifyToken]);

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-150 to-purple-100 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-65 pointer-events-none z-0" />

      {/* Centered Glass Card */}
      <div className={`relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-2xl p-8 md:p-10 rounded-3xl z-10 text-center transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        
        {/* Brand Logo */}
        <div className="inline-flex w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-white shadow-md mb-6">
          <FaBlog size="20" />
        </div>

        {/* LOADING STATE */}
        {mutation.isPending && (
          <div className="flex flex-col items-center py-4">
            {/* Spinning Loader */}
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.2s" }} />
            </div>
            
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
              Verifying Your Account
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Confirming your verification code with the server. Please do not close or reload this page.
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {mutation.isError && (
          <div className="flex flex-col items-center">
            {/* Warning Icon Container */}
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center shadow-sm mb-5">
              <FaExclamationTriangle size="28" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
              Verification Failed
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {mutation?.error?.response?.data?.message || 
                "The link is invalid, expired, or has already been used. Please try requesting a new verification email from your settings."}
            </p>

            {/* Navigation links */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link 
                to="/dashboard"
                className="flex-1 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-100 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
              >
                <AiOutlineDashboard size="16" /> Dashboard
              </Link>
              <Link 
                to="/"
                className="flex-1 py-3 rounded-full text-sm font-bold text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
              >
                <AiOutlineHome size="16" /> Home
              </Link>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {mutation.isSuccess && (
          <div className="flex flex-col items-center animate-scale-in">
            {/* Success Checkmark Circle */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center shadow-sm mb-5 animate-bounce">
              <FaCheckCircle size="30" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
              Account Verified!
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Congratulations! Your email has been successfully verified. You now have full credentials to create posts, manage categories, and earn.
            </p>

            <Link 
              to="/dashboard"
              className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-100 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <AiOutlineDashboard size="18" /> Go to Dashboard
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default AccountVerifiedComponent;
