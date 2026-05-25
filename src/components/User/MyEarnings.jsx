import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaDollarSign, FaHistory } from "react-icons/fa";
import { getMyEarningsAPI } from "../../APIServices/earnings/earningsAPI";

const MyEarnings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-earnings"],
    queryFn: getMyEarningsAPI,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const earningsList = data || [];
  
  // Calculate total lifetime earnings
  const totalEarnings = earningsList.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Dynamic Lifetime Earnings Metric Card */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-emerald-100/40 relative overflow-hidden">
        {/* Decorative blur rings */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-white/90 text-[10px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-white/5">
            Revenue Dashboard
          </span>
          <p className="text-emerald-100/90 text-xs font-bold uppercase tracking-wider">Lifetime Balance</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1.5 mb-1.5">
            ${totalEarnings.toFixed(2)}
          </h1>
          <p className="text-emerald-100/80 text-[11px] font-medium leading-relaxed">
            Total accumulated earnings derived from content reads and premium reader interactions.
          </p>
        </div>
      </div>

      {earningsList.length === 0 ? (
        /* Empty State */
        <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
            <FaDollarSign size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No earnings yet</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Once you publish premium posts and reader views/reactions generate earnings, they will be listed here.
          </p>
        </div>
      ) : (
        /* Detailed Transactions Wrapper */
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-sm border border-slate-100/80 overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-4.5 border-b border-slate-100/80 bg-white/30 flex items-center gap-2">
            <FaHistory className="text-indigo-650" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Transaction Log ({earningsList.length})
            </h3>
          </div>

          {/* List of transactions */}
          <ul className="divide-y divide-slate-100 bg-white/40">
            {earningsList.map((earning) => (
              <li
                key={earning._id}
                className="p-5 flex justify-between items-center hover:bg-slate-50/50 transition-colors"
              >
                <div>
                  <span className="font-bold text-slate-800 text-sm line-clamp-1 max-w-[250px] sm:max-w-md">
                    {earning.post?.title || "Story Revenue"}
                  </span>
                  <span className="block text-[10px] font-semibold text-slate-400 mt-1">
                    Creator: {earning.post?.author?.username || "You"}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-sm">
                    +${(earning.amount || 0).toFixed(2)}
                  </span>
                  <span className="block text-[10px] font-semibold text-slate-400 mt-1.5">
                    {new Date(earning.calculatedOn).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyEarnings;
