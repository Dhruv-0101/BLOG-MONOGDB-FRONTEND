import React from "react";
import {
  fetchNotificationsAPI,
  readNotificationAPI,
} from "../../APIServices/notifications/nofitificationsAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaCheckCircle, FaInbox } from "react-icons/fa";

const Notifications = () => {
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotificationsAPI,
  });

  // filter unread notifications
  const unreadNotifications = data?.filter(
    (notification) => notification?.isRead === false
  );

  // mutation
  const mutation = useMutation({
    mutationKey: ["read-notification"],
    mutationFn: readNotificationAPI,
  });

  // read notification handler
  const readNotificationHandler = (id, postId, shouldNavigate = true) => {
    mutation
      .mutateAsync(id)
      .then(() => {
        refetch();
        if (shouldNavigate && postId) {
          navigate(`/posts/${postId}`);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2.5">
            <div className="relative">
              <FaBell className="text-indigo-650 h-5 w-5" />
              {unreadNotifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              )}
            </div>
            Notifications
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Stay updated with your latest writer activity, views, and follow updates.
          </p>
        </div>
        {unreadNotifications?.length > 0 && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 shadow-sm">
            {unreadNotifications.length} Unread
          </span>
        )}
      </div>

      {/* Glassmorphic Container Card */}
      <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
          {unreadNotifications?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-inner">
                <FaInbox size={26} />
              </div>
              <div>
                <h3 className="font-bold text-slate-700 text-sm sm:text-base">All Caught Up!</h3>
                <p className="text-slate-400 text-xs font-semibold mt-1 max-w-xs mx-auto">
                  You have no unread notifications. Check back later for new milestones and comments!
                </p>
              </div>
            </div>
          ) : (
            unreadNotifications?.map((notification) => (
              <div
                key={notification?._id || notification?.id}
                onClick={() => readNotificationHandler(notification?._id, notification?.postId, true)}
                className="group py-4.5 first:pt-0 last:pb-0 cursor-pointer flex gap-4 items-start"
              >
                {/* Left status indicator icon */}
                <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-inner transition-colors duration-250">
                  <FaBell className="h-4.5 w-4.5" />
                </div>

                {/* Main Message Block */}
                <div className="flex-1 min-w-0">
                  <p className="text-slate-750 text-sm font-semibold leading-relaxed group-hover:text-indigo-650 transition-colors duration-200">
                    {notification.message}
                  </p>
                  <p className="text-[10px] font-extrabold text-slate-400 tracking-wide mt-1.5 uppercase">
                    {new Date(notification.createdAt).toLocaleDateString()} &bull; {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Read Action Button */}
                <div className="shrink-0 self-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      readNotificationHandler(notification?._id, null, false);
                    }}
                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 py-1.5 px-3 rounded-full bg-white hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 text-slate-650 hover:text-emerald-700 text-[10px] font-extrabold shadow-sm transition-all duration-200"
                    title="Mark as Read"
                  >
                    <FaCheckCircle className="h-3 w-3" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
