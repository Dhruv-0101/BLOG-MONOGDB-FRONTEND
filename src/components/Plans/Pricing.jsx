import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { fetchPlansAPI } from "../../APIServices/plans/plans";
import {
  FaCheck,
  FaTimes,
  FaQuestionCircle,
  FaCrown,
  FaStar,
} from "react-icons/fa";

const Pricing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["pricing-lists"],
    queryFn: fetchPlansAPI,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-650"></div>
      </div>
    );
  }

  const freePlan = data?.plans?.find((plan) => plan.planName === "Free");
  const premiumPlan = data?.plans?.find((plan) => plan.planName === "Premium");

  // Helper to check if a feature represents a limitation
  const isLimitation = (featureText) => {
    const text = featureText.toLowerCase();
    return (
      text.includes("lack of") ||
      text.includes("you can't") ||
      text.includes("no support") ||
      text.includes("not included") ||
      text.includes("no ")
    );
  };

  return (
    <div className="relative min-h-screen bg-slate-50/50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden antialiased">
      {/* Background Subtle Gradient Blobs (softened to keep layout crisp) */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-purple-100/40 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase tracking-wider border border-indigo-100 shadow-sm">
            <FaCrown className="w-3 h-3 text-indigo-550" />
            Plans & Subscriptions
          </span>
          {/* <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-850 tracking-tight leading-tight">
            Simple, Transparent{" "}
            <span className="inline-block px-1.5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-650 to-purple-650 filter drop-shadow-sm font-black">
              Pricing
            </span>
          </h1> */}
          {/* <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-semibold">
            Choose a plan that fits your writing and reading habits. Access
            premium articles, grow your following, and unlock monetization
            features.
          </p> */}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Free Plan Card (Crisp Minimal Light Layout) */}
          {freePlan && (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200" />
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-650 text-[10px] font-extrabold uppercase tracking-wider border border-slate-200/60">
                    Standard Access
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
                  {freePlan.planName}
                </h2>
                <p className="text-slate-450 text-xs font-semibold mb-6">
                  Perfect for reading and writing basic articles.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-slate-800 tracking-tight">
                    ${freePlan.price}
                  </span>
                  <span className="text-slate-400 font-bold text-sm">
                    / month
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-4">
                    What's included
                  </h3>
                  <ul className="space-y-4">
                    {freePlan.features?.map((feature, i) => {
                      const isLimit = isLimitation(feature);
                      return (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          {isLimit ? (
                            <>
                              <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 mt-0.5 shadow-inner">
                                <FaTimes className="w-2.5 h-2.5" />
                              </div>
                              <span className="text-slate-400 font-semibold line-through decoration-slate-300">
                                {feature}
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5 shadow-inner">
                                <FaCheck className="w-2.5 h-2.5" />
                              </div>
                              <span className="text-slate-650 font-bold">
                                {feature}
                              </span>
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to="/free-subscription"
                  className="w-full text-center py-3.5 px-6 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold text-slate-700 text-sm shadow-sm transition-all duration-200 block"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          )}

          {/* Premium Plan Card (Luxury High-Contrast Solid Dark Layout - Razor Sharp Text) */}
          {premiumPlan && (
            <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-950/10 hover:scale-[1.01] hover:shadow-indigo-550/5 hover:border-indigo-400/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-white">
              {/* Premium Top Glow Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-550" />

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-extrabold uppercase tracking-wider border border-indigo-400/20 shadow-md">
                    <FaStar className="w-2 h-2 text-yellow-300 animate-pulse" />
                    Most Popular
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight mb-2 flex items-center gap-2">
                  {premiumPlan.planName}
                  <FaCrown className="w-5 h-5 text-yellow-400" />
                </h2>
                <p className="text-slate-400 text-xs font-semibold mb-6">
                  For dedicated creators seeking full monetization features.
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-50 to-indigo-200">
                    ${premiumPlan.price}
                  </span>
                  <span className="text-indigo-350 font-bold text-sm">
                    / lifetime
                  </span>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider mb-4">
                    Everything in Free, plus
                  </h3>
                  <ul className="space-y-4">
                    {premiumPlan.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-450 shrink-0 mt-0.5 shadow-sm">
                          <FaCheck className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span className="text-slate-200 font-bold leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to={`/checkout/${premiumPlan._id}`}
                  className="w-full text-center py-3.5 px-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-550 hover:to-purple-550 text-white font-bold text-sm shadow-lg shadow-indigo-950/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 border border-indigo-500/20"
                >
                  Upgrade to Premium
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M5.5 10H15.9M15.9 10L10.9 5M15.9 10L10.9 15"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Pricing FAQs */}
        <div className="border-t border-slate-200/60 pt-16 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
              <FaQuestionCircle className="text-indigo-550 w-5 h-5" />
              Frequently Asked Questions
            </h2>
            <p className="text-slate-450 text-xs font-semibold">
              Everything you need to know about our plans and platform billing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:border-slate-300/80 transition-colors">
              <h3 className="text-sm font-extrabold text-slate-850 mb-2">
                What payment options are there?
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                We accept credit card payments, debit cards, and standard secure
                online transactions processed dynamically through Stripe
                integration.
              </p>
            </div>

            <div className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:border-slate-300/80 transition-colors">
              <h3 className="text-sm font-extrabold text-slate-850 mb-2">
                Is there a free trial option?
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Yes! Our standard Free tier requires zero credit cards and
                allows reading standard posts and writing draft articles.
              </p>
            </div>

            <div className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:border-slate-300/80 transition-colors">
              <h3 className="text-sm font-extrabold text-slate-850 mb-2">
                What billing schedule is offered?
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Our subscription plans are one-time payments. Upgrading to
                Premium gives lifetime writing and viewing privileges with no
                recurring bills.
              </p>
            </div>

            <div className="bg-white border border-slate-200/50 p-6 rounded-2xl shadow-sm hover:border-slate-300/80 transition-colors">
              <h3 className="text-sm font-extrabold text-slate-850 mb-2">
                Can I request a refund?
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Due to immediate payouts to article creators and transaction
                processing fees, we do not support subscription refunds at this
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
