import React from "react";
import {
  FaDollarSign,
  FaChartLine,
  FaHeart,
  FaStar,
  FaThumbsUp,
  FaEdit,
} from "react-icons/fa";

const featureList = [
  {
    icon: <FaDollarSign size="22" />,
    title: "Earn with Every View",
    description:
      "Turn your passion into profit. Build a steady income stream based directly on post views and engagement metrics.",
  },
  {
    icon: <FaChartLine size="22" />,
    title: "Deep Performance Insights",
    description:
      "Analyze reader habits, content views, likes, and comments with our real-time analytics dashboard.",
  },
  {
    icon: <FaHeart size="22" />,
    title: "Follower Relations",
    description:
      "Build a loyal audience. Send direct notifications whenever you publish, keeping your fans updated in real-time.",
  },
  {
    icon: <FaStar size="22" />,
    title: "Creator Leaderboard",
    description:
      "Climb the ranks on the public leaderboard. Gain reputation, visibility, and brand opportunities in our network.",
  },
  {
    icon: <FaThumbsUp size="22" />,
    title: "Interactive Engagement",
    description:
      "Enhance dialogue with multi-threaded comments and likes, establishing rich feedback loops for every article.",
  },
  {
    icon: <FaEdit size="22" />,
    title: "Rich Text Editor",
    description:
      "Write beautifully formatted articles with our powerful editor — supporting images, headings, lists, and more.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-slate-50/70 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-100/50 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating dots */}
      <div className="absolute top-16 left-[6%] w-3 h-3 rounded-full bg-indigo-300/50 animate-float pointer-events-none hidden md:block" />
      <div
        className="absolute top-24 right-[8%] w-2 h-2 rounded-full bg-violet-300/50 animate-float pointer-events-none hidden md:block"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-16 left-[12%] w-2 h-2 rounded-full bg-indigo-400/40 animate-float pointer-events-none hidden md:block"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="animate-fade-in text-xs uppercase tracking-widest text-indigo-600 font-bold mb-3">
            Platform Features
          </p>
          <h2 className="animate-fade-in-up delay-100 text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything You Need to{" "}
            <span className="text-indigo-600">Scale Your Writing</span>
          </h2>
          <p className="animate-fade-in-up delay-200 text-slate-500 mt-4 text-lg leading-relaxed">
            StoryFlow gives you every tool to write, grow, and earn — all under
            one roof.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featureList.map((feature, idx) => (
            <div
              key={idx}
              className="animate-fade-in-up group relative bg-white border border-slate-200 hover:border-indigo-300 p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/60 hover:-translate-y-2 cursor-default"
              style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                {/* Animated icon box */}
                <div className="w-13 h-13 w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 border border-indigo-100 group-hover:border-indigo-300 flex items-center justify-center text-indigo-600 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 shadow-sm">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-indigo-700 transition-colors duration-200">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover arrow */}
                {/* <div className="mt-5 flex items-center gap-1 text-xs font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0">
                  Learn more <span className="text-base">→</span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
