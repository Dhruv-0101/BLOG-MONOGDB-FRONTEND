import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";
import { userProfileAPI } from "../../APIServices/users/usersAPI";
import truncateString from "../../utils/truncateString";
import { deletePostAPI } from "../../APIServices/posts/postsAPI";
import { FaFileAlt } from "react-icons/fa";

const DashboardPosts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  // delete mutation
  const deletePostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  // handle delete post
  const handlePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation
        .mutateAsync(postId)
        .then(() => {
          refetch();
        })
        .catch((e) => console.log(e));
    }
  };

  const userPosts = data?.user?.posts || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Your Articles</h1>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Manage, update, and track performance for all your published stories.
          </p>
        </div>
        <Link
          to="/dashboard/create-post"
          className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 rounded-full shadow-md shadow-indigo-100 transition-all"
        >
          Create New Post
        </Link>
      </div>

      {userPosts.length === 0 ? (
        /* Empty State */
        <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
            <FaFileAlt size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No articles yet</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
            Share your knowledge, tutorials, or stories with the world. Your published posts will show up here.
          </p>
          <Link
            to="/dashboard/create-post"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-indigo-650 hover:bg-indigo-700 rounded-full shadow-md transition-all"
          >
            Write Your First Post
          </Link>
        </div>
      ) : (
        /* Posts Table List */
        <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-white/30 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Published Posts ({userPosts.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6">Post Details</th>
                  <th className="py-4 px-6 text-right">This Month</th>
                  <th className="py-4 px-6 text-right">Total Earnings</th>
                  <th className="py-4 px-6">Date Created</th>
                  <th className="py-4 px-6">Next Payout</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/60">
                {userPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Post Image & Info */}
                    <td className="py-4.5 px-6">
                      <div className="flex items-center gap-3">
                        {post?.image?.path ? (
                          <img
                            src={post?.image?.path}
                            alt={post?.title}
                            className="w-10 h-10 object-cover rounded-xl shadow-sm ring-1 ring-slate-100"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-indigo-50 text-indigo-650 rounded-xl flex items-center justify-center font-bold text-xs">
                            Post
                          </div>
                        )}
                        <div className="max-w-[200px] sm:max-w-xs">
                          <Link
                            to={`/posts/${post._id}`}
                            className="font-bold text-slate-800 text-sm hover:text-indigo-650 transition-colors truncate block"
                          >
                            {truncateString(htmlToText(post?.description || ""), 50)}
                          </Link>
                        </div>
                      </div>
                    </td>

                    {/* Earnings columns */}
                    <td className="py-4.5 px-6 text-right font-bold text-slate-700 text-xs sm:text-sm">
                      ${(post?.thisMonthEarnings || 0).toFixed(2)}
                    </td>
                    <td className="py-4.5 px-6 text-right font-bold text-slate-800 text-xs sm:text-sm">
                      ${(post?.totalEarnings || 0).toFixed(2)}
                    </td>

                    {/* Dates */}
                    <td className="py-4.5 px-6 text-slate-500 font-semibold text-xs whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4.5 px-6 whitespace-nowrap">
                      {post.nextEarningDate ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100/60 shadow-sm">
                          {new Date(post.nextEarningDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">-</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4.5 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          to={`/dashboard/update-post/${post._id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                          title="Edit Post"
                        >
                          <FiEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handlePost(post._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                          title="Delete Post"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPosts;
