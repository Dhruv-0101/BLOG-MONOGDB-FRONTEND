import { useQuery } from "@tanstack/react-query";
import React from "react";
import { userProfileAPI } from "../../APIServices/users/usersAPI";
import Avatar from "./Avatar";
import { FaUsers } from "react-icons/fa";

const MyFollowers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const myFollowers = data?.user?.followers || [];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">My Followers</h1>
        <p className="text-xs font-semibold text-slate-400 mt-1">
          Here are all the readers and creators who follow your profile.
        </p>
      </div>

      {myFollowers.length === 0 ? (
        /* Empty State */
        <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4">
            <FaUsers size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No followers yet</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Keep publishing high-quality stories to attract new followers and grow your audience.
          </p>
        </div>
      ) : (
        /* Followers Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myFollowers.map((follower) => (
            <div
              key={follower._id}
              className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-2xl p-6 text-center hover:shadow-md hover:scale-[1.01] hover:bg-white/90 transition-all duration-200 flex flex-col items-center"
            >
              {follower?.profilePicture ? (
                <img
                  className="w-18 h-18 rounded-full object-cover mb-4 ring-4 ring-indigo-50/70"
                  src={follower?.profilePicture}
                  alt={follower?.username}
                />
              ) : (
                <div className="w-18 h-18 rounded-full overflow-hidden mb-4 ring-4 ring-indigo-50/70">
                  <Avatar />
                </div>
              )}
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                {follower?.username || "StoryFlow User"}
              </h3>
              <span className="block text-xs font-semibold text-slate-400 mt-1">
                {follower?.email || "No email provided"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFollowers;
