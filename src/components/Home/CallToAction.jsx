import React from "react";
import { FaRocket, FaMagic } from "react-icons/fa";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-slate-50/50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative overflow-hidden bg-slate-900 rounded-3xl md:rounded-[40px] py-16 px-6 md:p-20 shadow-2xl">
          {/* Neon mesh glows inside card */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-indigo-500/20 to-purple-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-gradient-to-tr from-pink-500/20 to-rose-500/20 rounded-full blur-[70px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Sparkle Icon Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-indigo-400 text-xs font-semibold mb-8">
              <FaMagic className="animate-spin-slow" />
              <span>Join the Future of Blogging</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Ready to Turn Your Insights <br className="hidden sm:inline" />
              Into a Thriving Business?
            </h2>

            {/* Description */}
            <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Start publishing today. Connect with thousands of readers, offer premium subscriptions, and enjoy transparent payout systems built for writers.
            </p>

            {/* CTA and Metadata */}
            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4.5 px-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <FaRocket className="text-sm" />
                Get Started Now
              </Link>
              <span className="text-xs text-slate-500 mt-2">
                No credit card required. Instant account setup.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
