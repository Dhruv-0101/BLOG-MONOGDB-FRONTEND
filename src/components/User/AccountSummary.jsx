import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaEye,
  FaDollarSign,
  FaUsers,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaCommentDots,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import {
  sendEmailVerificatonTokenAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";
import { getMyEarningsAPI } from "../../APIServices/earnings/earningsAPI";

const AccountSummaryDashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  const { data: earnings } = useQuery({
    queryKey: ["my-earnings"],
    queryFn: getMyEarningsAPI,
  });

  // check if user has email
  const hasEmail = data?.user?.email;

  // check if user has plan
  const hasPlan = data?.user?.hasSelectedPlan;

  // check if user has verified account
  const isEmailVerified = data?.user?.isEmailVerified;

  // total followers
  const totalFollowers = data?.user?.followers?.length;

  // total following
  const totalFollowing = data?.user?.following?.length;

  // get user posts
  const userPosts = data?.user?.posts?.length;

  // calculate metrics from posts
  let totalViews = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalDislikes = 0;

  data?.user?.posts?.forEach((post) => {
    totalViews += post.viewers?.length || 0;
    totalLikes += post.likes?.length || 0;
    totalDislikes += post.dislikes?.length || 0;
    totalComments += post.comments?.length || 0;
  });

  // Calc total amount
  const totalEarnings = earnings?.reduce((acc, curr) => acc + curr.amount, 0);

  const stats = [
    {
      icon: <FaEye size={18} />,
      label: "Total Views",
      value: totalViews,
      gradient: "from-blue-500 to-indigo-500 shadow-blue-100",
    },
    {
      icon: <FaDollarSign size={18} />,
      label: "Total Earnings",
      value: `$${(totalEarnings || 0).toFixed(2)}`,
      gradient: "from-emerald-500 to-teal-600 shadow-emerald-100",
    },
    {
      icon: <FaUsers size={18} />,
      label: "Followers",
      value: totalFollowers || 0,
      gradient: "from-purple-500 to-indigo-500 shadow-purple-100",
    },
    {
      icon: <FaThumbsUp size={18} />,
      label: "Likes",
      value: totalLikes || 0,
      gradient: "from-amber-500 to-orange-500 shadow-amber-100",
    },
    {
      icon: <FaThumbsDown size={18} />,
      label: "Dislikes",
      value: totalDislikes || 0,
      gradient: "from-rose-500 to-red-600 shadow-rose-100",
    },
    {
      icon: <FaUsers size={18} />,
      label: "Following",
      value: totalFollowing || 0,
      gradient: "from-sky-500 to-blue-600 shadow-sky-100",
    },
    {
      icon: <FaFlag size={18} />,
      label: "Articles Written",
      value: userPosts || 0,
      gradient: "from-pink-500 to-rose-500 shadow-pink-100",
    },
    {
      icon: <FaCommentDots size={18} />,
      label: "Comments Received",
      value: totalComments || 0,
      gradient: "from-cyan-500 to-teal-500 shadow-cyan-100",
    },
  ];

  // Sending email verification token mutation
  const verificationTokenMutation = useMutation({
    mutationKey: ["send-email-verification-token"],
    mutationFn: sendEmailVerificatonTokenAPI,
  });

  const handleSendVerificationEmail = async () => {
    verificationTokenMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-52 h-52 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/95 text-[11px] font-bold uppercase tracking-wider mb-4.5 backdrop-blur-sm border border-white/5">
            Creator Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Welcome Back, {data?.user?.username}!
          </h1>
          <p className="text-indigo-100 max-w-xl text-sm leading-relaxed">
            Monitor your stats, review earnings, connect with followers, and keep writing engaging stories. Let's see how your dashboard is performing today.
          </p>
        </div>
      </div>

      {/* Alert Notifications */}
      <div className="space-y-4">
        {verificationTokenMutation.isPending && (
          <AlertMessage type="loading" message="Sending verification email..." />
        )}
        {verificationTokenMutation.isError && (
          <AlertMessage
            type="error"
            message={
              verificationTokenMutation?.error?.message ||
              verificationTokenMutation?.error?.response?.data?.message ||
              "Failed to send email."
            }
          />
        )}
        {verificationTokenMutation.isSuccess && (
          <AlertMessage
            type="success"
            message={verificationTokenMutation?.data?.message || "Verification email sent successfully!"}
          />
        )}

        {!hasPlan && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/80 backdrop-blur-sm border border-amber-100/70 text-amber-800 rounded-2xl p-5 shadow-sm">
            <div>
              <h4 className="font-extrabold text-amber-900 mb-1 flex items-center gap-1.5 text-sm">
                ⚠️ Plan Selection Required
              </h4>
              <p className="text-xs sm:text-sm text-amber-800/90 font-medium leading-relaxed">
                You haven't selected a subscription plan yet. Please select a plan to unlock all writing privileges and start earning.
              </p>
            </div>
            <Link
              to="/pricing"
              className="inline-flex justify-center items-center px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-full shadow-md shadow-amber-200 transition-all shrink-0 self-start sm:self-center"
            >
              Select a Plan
            </Link>
          </div>
        )}

        {!isEmailVerified && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-rose-50/80 backdrop-blur-sm border border-rose-100/70 text-rose-800 rounded-2xl p-5 shadow-sm">
            <div>
              <h4 className="font-extrabold text-rose-900 mb-1 flex items-center gap-1.5 text-sm">
                ✉️ Account Verification Needed
              </h4>
              <p className="text-xs sm:text-sm text-rose-800/90 font-medium leading-relaxed">
                Your account is unverified. Verify your email to ensure full platform access and account security.
              </p>
            </div>
            <button
              onClick={handleSendVerificationEmail}
              className="inline-flex justify-center items-center px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-full shadow-md shadow-rose-200 transition-all shrink-0 self-start sm:self-center"
            >
              Verify Now
            </button>
          </div>
        )}

        {!hasEmail && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-indigo-50/80 backdrop-blur-sm border border-indigo-100/70 text-indigo-800 rounded-2xl p-5 shadow-sm">
            <div>
              <h4 className="font-extrabold text-indigo-900 mb-1 flex items-center gap-1.5 text-sm">
                📧 Email Address Missing
              </h4>
              <p className="text-xs sm:text-sm text-indigo-800/90 font-medium leading-relaxed">
                Please add a primary email address to receive reader comments, subscription alerts, and payouts.
              </p>
            </div>
            <Link
              to="/dashboard/add-email"
              className="inline-flex justify-center items-center px-4 py-2 text-xs font-bold text-white bg-indigo-650 hover:bg-indigo-700 active:scale-95 rounded-full shadow-md shadow-indigo-200 transition-all shrink-0 self-start sm:self-center"
            >
              Add Email
            </Link>
          </div>
        )}
      </div>

      {/* Stats Cards Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4 tracking-tight">Your Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] hover:bg-white/90 transition-all duration-200 flex items-center gap-4"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-800 tracking-tight">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSummaryDashboard;
