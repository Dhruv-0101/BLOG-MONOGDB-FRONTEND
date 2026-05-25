import React from "react";
import Features from "./Features";
import Footer from "../Footer/Footer";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaArrowRight,
  FaFeatherAlt,
  FaTrophy,
  FaUsers,
  FaDollarSign,
  FaPen,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";

const Home = () => {
  const { userAuth } = useSelector((state) => state.auth);
  if (userAuth) return <Navigate to="/dashboard" replace />;

  const stats = [
    { icon: <FaFeatherAlt />, value: "1,000+", label: "Stories Published" },
    { icon: <FaUsers />,      value: "500+",   label: "Active Writers"    },
    { icon: <FaTrophy />,     value: "50+",    label: "Creator Rankings"  },
    { icon: <FaDollarSign />, value: "$10k+",  label: "Earned by Creators"},
  ];

  const steps = [
    {
      num: "01",
      title: "Create Your Account",
      desc: "Sign up for free and set up your author profile in under a minute. No credit card required.",
      icon: <FaPen />,
    },
    {
      num: "02",
      title: "Publish Your Stories",
      desc: "Write and publish articles with our rich editor and reach a global community of readers.",
      icon: <FaFeatherAlt />,
    },
    {
      num: "03",
      title: "Grow & Earn Revenue",
      desc: "Build followers and earn income from every view. Climb the creator leaderboard as you grow.",
      icon: <FaDollarSign />,
    },
  ];

  const perks = [
    "Free account — no credit card needed",
    "Earn revenue from every post view",
    "Climb the creator leaderboard",
    "Real-time follower notifications",
    "Rich text editor with media upload",
    "Built-in analytics dashboard",
  ];

  return (
    <div className="relative overflow-x-hidden bg-white">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-white min-h-screen flex flex-col justify-center">

        {/* Animated background blobs */}
        <div className="absolute -top-32 -left-32 w-[560px] h-[560px] bg-indigo-100 rounded-full blur-[160px] opacity-80 animate-blob pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-[480px] h-[480px] bg-violet-100 rounded-full blur-[160px] opacity-70 animate-blob pointer-events-none" style={{ animationDelay: "3s" }} />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[130px] opacity-60 animate-blob pointer-events-none" style={{ animationDelay: "5.5s" }} />

        {/* Spinning ring decoration */}
        <div className="absolute top-20 right-[12%] w-24 h-24 rounded-full border-4 border-dashed border-indigo-200/70 animate-spin-slow pointer-events-none hidden lg:block" />
        <div className="absolute bottom-32 left-[8%] w-16 h-16 rounded-full border-4 border-dashed border-violet-200/70 animate-spin-slow pointer-events-none hidden lg:block" style={{ animationDirection: "reverse" }} />

        {/* Floating dots decoration */}
        <div className="absolute top-40 left-[18%] w-3 h-3 rounded-full bg-indigo-300/60 animate-float pointer-events-none hidden md:block" />
        <div className="absolute top-56 right-[22%] w-2 h-2 rounded-full bg-violet-400/50 animate-float pointer-events-none hidden md:block" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 right-[15%] w-3 h-3 rounded-full bg-indigo-400/40 animate-float pointer-events-none hidden md:block" style={{ animationDelay: "2s" }} />

        <div className="container px-4 mx-auto relative z-10 py-24 md:py-32">
          <div className="max-w-5xl mx-auto text-center">

            {/* Badge */}
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 border border-indigo-200 text-indigo-700 text-sm font-semibold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
              </span>
              The Premium Blog Writing Platform
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-extrabold tracking-tight text-slate-900 mb-7 leading-[1.06]">
              Empower Your Words,{" "}
              <br className="hidden md:inline" />
              <span className="text-shimmer">Monetize Your Mind</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-200 text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              StoryFlow is where writers earn, grow, and connect. Publish
              stories, build a following, and get paid for every view.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
              <Link
                to="/register"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-9 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
              >
                Start Writing Free
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/posts"
                className="w-full sm:w-auto inline-flex items-center justify-center py-4 px-9 rounded-full bg-white text-slate-700 font-bold text-base border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/50 shadow-sm hover:shadow-md hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
              >
                Explore Articles
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="animate-scale-in flex flex-col items-center gap-2 bg-white border border-indigo-100 rounded-2xl py-5 px-4 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-base">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium text-center leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full h-12 text-white fill-current" preserveAspectRatio="none">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-50/60 rounded-full blur-[150px]" />
        </div>

        <div className="container px-4 mx-auto relative z-10">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="animate-fade-in text-xs uppercase tracking-widest text-indigo-600 font-bold mb-3">
              Simple &amp; Powerful
            </p>
            <h2 className="animate-fade-in-up delay-100 text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Write. Publish. <span className="text-indigo-600">Earn.</span>
            </h2>
            <p className="animate-fade-in-up delay-200 text-slate-500 mt-4 text-lg leading-relaxed">
              Three steps to launch your creator career on StoryFlow.
            </p>
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[calc(33%-20px)] right-[calc(33%-20px)] h-0.5 bg-indigo-100 z-0" />

            {steps.map((item, i) => (
              <div
                key={i}
                className="animate-fade-in-up relative z-10 flex flex-col items-center text-center group"
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                {/* Icon circle */}
                <div className="w-24 h-24 rounded-full bg-indigo-50 border-2 border-indigo-100 group-hover:border-indigo-400 group-hover:bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl mb-6 shadow-md group-hover:shadow-lg group-hover:shadow-indigo-100 group-hover:-translate-y-2 transition-all duration-300 animate-float" style={{ animationDelay: `${i * 1.3}s` }}>
                  {item.icon}
                </div>
                {/* Step number */}
                <div className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest mb-2">
                  Step {item.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-indigo-700 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <Features />

      {/* ── WHY STORYFLOW  ───────────────────────────────────────── */}
      <section className="py-24 bg-indigo-50/60 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-indigo-100/70 rounded-full blur-[140px] animate-blob pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-violet-100/60 rounded-full blur-[130px] animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div className="animate-slide-left">
              <p className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-4">
                Why StoryFlow?
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Everything a serious writer needs,{" "}
                <span className="text-indigo-600">in one place.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                No ads. No paywalls. Just a clean, powerful platform that puts
                your words first and rewards your creativity with real income.
              </p>
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 py-4 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
              >
                <FaRocket className="text-sm" />
                Join StoryFlow Free
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Right — perks */}
            <div className="animate-slide-right grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white border border-indigo-100 hover:border-indigo-300 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <FaCheckCircle className="text-indigo-500 mt-0.5 flex-shrink-0" size="16" />
                  <span className="text-slate-700 text-sm font-medium leading-snug">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Large soft glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[500px] bg-indigo-50 rounded-full blur-[130px] animate-blob" />
        </div>

        {/* Floating rings */}
        <div className="absolute top-10 left-[10%] w-20 h-20 rounded-full border-2 border-indigo-100 animate-float-slow pointer-events-none hidden lg:block" />
        <div className="absolute bottom-10 right-[10%] w-14 h-14 rounded-full border-2 border-indigo-100 animate-float pointer-events-none hidden lg:block" style={{ animationDelay: "2s" }} />

        <div className="container px-4 mx-auto relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-sm font-semibold mb-7">
              <FaPen size="11" />
              Built for passionate writers
            </div>
            <h2 className="animate-fade-in-up delay-100 text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Your audience is waiting.
              <br />
              <span className="text-shimmer">Start writing today.</span>
            </h2>
            <p className="animate-fade-in-up delay-200 text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of creators on StoryFlow — the platform that
              rewards your creativity with real income.
            </p>
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/register"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
              >
                Get Started Free
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/posts"
                className="w-full sm:w-auto inline-flex items-center justify-center py-4 px-10 rounded-full border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/50 font-bold text-base transition-all duration-200"
              >
                Browse Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
};

export default Home;
