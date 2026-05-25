import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrophy, FaDollarSign, FaCrown, FaBookOpen } from "react-icons/fa";
import { fetchAllEarningsAPI } from "../../APIServices/earnings/earningsAPI";

const Rankings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ranking"],
    queryFn: fetchAllEarningsAPI,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const rankingList = data?.earnings || [];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background ambient blurs */}
      <div className="absolute top-[-10%] left-[-15%] w-[55%] h-[40%] bg-gradient-to-tr from-violet-200/40 via-indigo-200/40 to-purple-100/30 rounded-full blur-[120px] opacity-75 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[45%] bg-gradient-to-br from-pink-200/30 via-rose-100/30 to-amber-100/20 rounded-full blur-[130px] opacity-60 pointer-events-none z-0" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-12 animate-fade-in-up">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 items-center justify-center text-amber-500 shadow-md mb-2 animate-bounce">
            <FaTrophy className="text-3xl" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Creators Leaderboard
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Celebrating the top-performing authors who drive conversations, write stories, and inspire our blogging community.
          </p>
        </div>

        {/* Leaderboard Stack */}
        <div className="space-y-4">
          {rankingList.map((ranking, index) => {
            const isRank1 = index === 0;
            const isRank2 = index === 1;
            const isRank3 = index === 2;

            let rankBadgeClass = "bg-slate-50 text-slate-500 border-slate-200/50";
            let cardBorderClass = "border-slate-100/80 hover:border-indigo-100/50 bg-white/70";
            let crownColor = "";
            let avatarRing = "ring-2 ring-indigo-50";

            if (isRank1) {
              rankBadgeClass = "bg-amber-100 text-amber-700 border-amber-300 scale-110";
              cardBorderClass = "border-amber-250 bg-gradient-to-r from-amber-50/50 via-white to-white shadow-lg shadow-amber-500/5 scale-[1.02]";
              crownColor = "text-amber-500";
              avatarRing = "ring-4 ring-amber-400 shadow-md shadow-amber-200/50";
            } else if (isRank2) {
              rankBadgeClass = "bg-slate-100 text-slate-650 border-slate-300";
              cardBorderClass = "border-slate-200/80 bg-gradient-to-r from-slate-50/30 via-white to-white";
              crownColor = "text-slate-400";
              avatarRing = "ring-4 ring-slate-300 shadow-md shadow-slate-100/50";
            } else if (isRank3) {
              rankBadgeClass = "bg-orange-100 text-orange-700 border-orange-200";
              cardBorderClass = "border-orange-200/80 bg-gradient-to-r from-orange-50/30 via-white to-white";
              crownColor = "text-orange-500";
              avatarRing = "ring-4 ring-orange-350 shadow-md shadow-orange-100/50";
            }

            const userProfilePic = ranking?.user?.profilePicture?.path || ranking?.user?.profilePicture;

            return (
              <div
                key={index}
                className={`border ${cardBorderClass} backdrop-blur-xl rounded-3xl p-5 flex items-center justify-between gap-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-300`}
              >
                {/* Profile info & Rank */}
                <div className="flex items-center gap-4 min-w-0">
                  
                  {/* Rank Badge */}
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-black text-xs shrink-0 ${rankBadgeClass}`}>
                    #{index + 1}
                  </span>

                  {/* Profile Picture */}
                  <div className="relative shrink-0">
                    {userProfilePic ? (
                      <img
                        src={userProfilePic}
                        alt={ranking.user?.username || "Creator"}
                        className={`w-12 h-12 rounded-full object-cover ${avatarRing}`}
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-base font-bold shadow-md ${avatarRing}`}>
                        {(ranking.user?.username || "S").charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    {/* Crown icon for top 3 */}
                    {(isRank1 || isRank2 || isRank3) && (
                      <span className="absolute -top-3 -right-2 transform rotate-[15deg] drop-shadow-sm">
                        <FaCrown className={`text-sm ${crownColor}`} />
                      </span>
                    )}
                  </div>

                  {/* Creator Name & Post count */}
                  <div className="min-w-0">
                    <p className="font-extrabold text-slate-800 text-sm sm:text-base truncate flex items-center gap-1.5">
                      {ranking.user?.username || "StoryFlow Creator"}
                      {isRank1 && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700">
                          Top Writer
                        </span>
                      )}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-650 text-[10px] font-extrabold border border-indigo-100/35">
                      <FaBookOpen size="10" />
                      <span>{ranking.user?.posts?.length || 0} Articles</span>
                    </span>
                  </div>

                </div>

                {/* Lifetime Earnings */}
                <div className="shrink-0 text-right flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold px-4 py-2 rounded-full shadow-sm text-xs sm:text-sm hover:scale-105 transition-transform duration-200">
                  <FaDollarSign size={13} className="text-emerald-600" />
                  <span>{(ranking.totalAmount || 0).toFixed(2)}</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Rankings;
