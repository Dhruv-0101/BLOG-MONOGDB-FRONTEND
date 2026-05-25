import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaBlog, FaArrowRight } from "react-icons/fa";
import { AiOutlineDashboard, AiOutlineEdit } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { paymentVerificationAPI } from "../../APIServices/stripe/plans";

const PaymentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Get the query data for payment ID
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  const { data, isError, isLoading, isSuccess, error } = useQuery({
    queryKey: ["verify-payment"],
    queryFn: () => paymentVerificationAPI(paymentIntentId),
    enabled: !!paymentIntentId,
  });

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-150 to-purple-100 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-65 pointer-events-none z-0" />

      {/* Glass Card Container */}
      <div className={`relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-2xl p-8 rounded-3xl z-10 text-center transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        
        {/* Brand Logo */}
        <div className="inline-flex w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-white shadow-md mb-6">
          <FaBlog size="20" />
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex flex-col items-center py-4">
            {/* Spinning Loader */}
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.2s" }} />
            </div>
            
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
              Verifying Payment
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Confirming transaction details with Stripe. Please do not close or reload this window.
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {isError && (
          <div className="flex flex-col items-center">
            {/* Error Icon */}
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center shadow-sm mb-5">
              <FaTimesCircle size="28" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
              Verification Failed
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {error?.message || "We could not verify your payment transaction. Please contact support if the amount was debited."}
            </p>

            <Link 
              to="/pricing"
              className="w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5"
            >
              Back to Pricing
            </Link>
          </div>
        )}

        {/* SUCCESS STATE */}
        {isSuccess && (
          <div className="flex flex-col items-center animate-scale-in">
            {/* Success Checkmark Circle */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center shadow-sm mb-5 animate-bounce">
              <FaCheckCircle size="30" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-2">
              Payment Successful!
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Welcome to StoryFlow Premium! Your subscription has been verified successfully, and your writer account privileges have been updated.
            </p>

            {/* Receipt details */}
            <div className="bg-slate-50/70 border border-slate-200/50 p-4 rounded-2xl w-full text-left space-y-2 mb-6">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-400">Subscription Plan</span>
                <span className="font-bold text-slate-700">Premium Upgrade</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-400">Access Term</span>
                <span className="font-bold text-slate-700">Lifetime Access</span>
              </div>
              <div className="flex flex-col text-xs pt-2 border-t border-slate-100 gap-1">
                <span className="font-bold text-slate-400">Transaction ID</span>
                <span className="font-mono text-slate-500 text-[10px] break-all select-all font-bold">
                  {paymentIntentId}
                </span>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col gap-3 w-full">
              <Link 
                to="/dashboard/create-post"
                className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-100 hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <AiOutlineEdit size="18" /> Start Creating
              </Link>
              <Link 
                to="/dashboard"
                className="w-full py-3 rounded-full text-sm font-bold text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
              >
                <AiOutlineDashboard size="16" /> Go to Dashboard
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentSuccess;
