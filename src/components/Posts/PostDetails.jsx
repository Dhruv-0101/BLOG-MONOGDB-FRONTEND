import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaEye,
  FaComment,
  FaRegCalendarAlt,
  FaUserCircle,
  FaArrowLeft,
  FaTag,
} from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  dislikePostAPI,
  fetchPost,
  likePostAPI,
} from "../../APIServices/posts/postsAPI";
import { RiUserUnfollowFill, RiUserFollowLine } from "react-icons/ri";
import {
  followUserAPI,
  unfollowUserAPI,
  userProfileAPI,
} from "../../APIServices/users/usersAPI";
import { createCommentAPI } from "../../APIServices/comments/commentsAPI";
import { useFormik } from "formik";
import AlertMessage from "../Alert/AlertMessage";
import truncateString from "../../utils/truncateString";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const {
    isError,
    isLoading,
    data,
    refetch: refetchPost,
  } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId),
  });

  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userProfileAPI(),
  });

  useEffect(() => {
    refetchPost();
  }, [postId, refetchPost]);

  const authorData = data?.postFound?.author;
  const targetId = authorData?._id || authorData;
  const authorUsername = authorData?.username || "StoryFlow Creator";
  const authorProfilePicture =
    authorData?.profilePicture?.path || authorData?.profilePicture;

  const { userAuth } = useSelector((state) => state.auth);
  const userId = userAuth?._id || userAuth?.id || profileData?.user?._id;
  const isFollowing = profileData?.user?.following?.find(
    (user) => user?._id?.toString() === targetId?.toString()
  );
  const isAuthorSelf = userId?.toString() === targetId?.toString();

  // Mutations
  const followUserMutation = useMutation({
    mutationKey: ["follow"],
    mutationFn: followUserAPI,
  });
  const unfollowUserMutation = useMutation({
    mutationKey: ["unfollow"],
    mutationFn: unfollowUserAPI,
  });
  const likePostMutation = useMutation({
    mutationKey: ["likes"],
    mutationFn: likePostAPI,
  });
  const dislikePostMutation = useMutation({
    mutationKey: ["dislikes"],
    mutationFn: dislikePostAPI,
  });
  const commentMutation = useMutation({
    mutationKey: ["create-comment"],
    mutationFn: createCommentAPI,
  });

  const followUserHandler = async () => {
    if (!userId) return alert("Please login to follow creators.");
    followUserMutation
      .mutateAsync(targetId)
      .then(() => refetchProfile())
      .catch((e) => console.log(e));
  };

  const unfollowUserHandler = async () => {
    unfollowUserMutation
      .mutateAsync(targetId)
      .then(() => refetchProfile())
      .catch((e) => console.log(e));
  };

  const likePostHandler = async () => {
    if (!userId) return alert("Please login to react to posts.");
    likePostMutation
      .mutateAsync(postId)
      .then(() => refetchPost())
      .catch((e) => console.log(e));
  };

  const dislikesPostHandler = async () => {
    if (!userId) return alert("Please login to react to posts.");
    dislikePostMutation
      .mutateAsync(postId)
      .then(() => refetchPost())
      .catch((e) => console.log(e));
  };

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: Yup.object({
      content: Yup.string().required("Comment content cannot be empty"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!userId) return alert("Please login to leave comments.");
      commentMutation
        .mutateAsync({ content: values.content, postId })
        .then(() => {
          resetForm();
          refetchPost();
        })
        .catch((e) => console.log(e));
    },
  });

  // ── Loading ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50">
        <AlertMessage type="loading" message="Loading article details..." />
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────
  if (isError || !data?.postFound) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50 px-4">
        <AlertMessage
          type="error"
          message="Article not found or failed to load. Please check back later."
        />
      </div>
    );
  }

  const post = data.postFound;
  const likesCount = post.likes?.length || 0;
  const dislikesCount = post.dislikes?.length || 0;
  const viewsCount = post.viewers?.length || 0;
  const commentsCount = post.comments?.length || 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-200 to-purple-100 rounded-full blur-[140px] opacity-50 pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-40 pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 md:py-16">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors duration-200 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">
            <FaArrowLeft />
          </span>
          Back to Articles
        </button>

        {/* Main Article Card */}
        <article className="bg-white border border-slate-100 rounded-[32px] shadow-xl overflow-hidden">

          {/* Banner Image */}
          <div className="relative w-full h-[260px] md:h-[420px] overflow-hidden">
            <img
              src={post.image?.path || post.image}
              alt="Article Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Category badge */}
            {post.category?.categoryName && (
              <div className="absolute top-5 left-5 py-1.5 px-4 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-indigo-600 shadow-lg border border-indigo-50 uppercase tracking-wider flex items-center gap-1.5">
                <FaTag size="9" />
                {post.category.categoryName}
              </div>
            )}
            {/* Stats overlay on banner */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <FaEye size="11" />
                  {viewsCount} views
                </div>
                <div className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <FaComment size="11" />
                  {commentsCount} comments
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <FaRegCalendarAlt size="11" />
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 md:p-10">

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              {post.description
                ? truncateString(post.description.replace(/<[^>]*>/g, ""), 80)
                : "Article Detail"}
            </h1>

            {/* Author Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50/80 border border-slate-100 rounded-2xl p-4 mb-8">
              <div className="flex items-center gap-3">
                {authorProfilePicture ? (
                  <img
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100 shadow-md"
                    src={authorProfilePicture}
                    alt={authorUsername}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                    {authorUsername.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-slate-900">{authorUsername}</div>
                  <div className="text-xs text-slate-400 mt-0.5">Published Creator</div>
                </div>
              </div>

              {/* Follow / Unfollow */}
              {!isAuthorSelf && userId && (
                <div>
                  {isFollowing ? (
                    <button
                      onClick={unfollowUserHandler}
                      disabled={unfollowUserMutation.isPending}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-all duration-200 shadow-sm disabled:opacity-60"
                    >
                      <RiUserUnfollowFill />
                      {unfollowUserMutation.isPending ? "Unfollowing..." : "Unfollow"}
                    </button>
                  ) : (
                    <button
                      onClick={followUserHandler}
                      disabled={followUserMutation.isPending}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-60"
                    >
                      <RiUserFollowLine />
                      {followUserMutation.isPending ? "Following..." : "Follow"}
                    </button>
                  )}
                </div>
              )}
              {!userId && (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 shadow-md"
                >
                  Login to Follow
                </Link>
              )}
            </div>

            {/* Reaction bar */}
            <div className="flex flex-wrap items-center gap-3 mb-10 pb-8 border-b border-slate-100">
              <button
                onClick={likePostHandler}
                disabled={likePostMutation.isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-700 text-sm font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-sm disabled:opacity-60"
              >
                <FaThumbsUp />
                <span>{likesCount} Likes</span>
              </button>

              <button
                onClick={dislikesPostHandler}
                disabled={dislikePostMutation.isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 text-sm font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-sm disabled:opacity-60"
              >
                <FaThumbsDown />
                <span>{dislikesCount} Dislikes</span>
              </button>

              <div className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50/80 border border-slate-100 text-slate-500 text-xs font-semibold">
                <FaEye className="text-slate-400" />
                {viewsCount} views
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-slate max-w-none mb-14">
              <div
                className="rendered-html-content text-slate-700 text-base md:text-lg leading-relaxed space-y-6 font-sans"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
            </div>

            {/* Comment Form */}
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <FaComment className="text-indigo-600 text-sm" />
                </div>
                Write a Response
              </h3>

              <form onSubmit={formik.handleSubmit}>
                <textarea
                  className="w-full border border-slate-200 rounded-xl p-4 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 transition-all duration-200 bg-white mb-3 resize-none"
                  rows="4"
                  placeholder={
                    userId
                      ? "What are your thoughts on this story?"
                      : "Login to leave a comment..."
                  }
                  disabled={!userId}
                  {...formik.getFieldProps("content")}
                />

                {formik.touched.content && formik.errors.content && (
                  <p className="text-xs text-red-500 mb-3 font-semibold">
                    {formik.errors.content}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    {userId
                      ? "Your comment will be posted publicly."
                      : (
                        <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                          Login
                        </Link>
                      )}{" "}
                  </p>
                  <button
                    type="submit"
                    disabled={commentMutation.isPending || !userId}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaComment size="12" />
                    {commentMutation.isPending ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </form>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                Comments
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold">
                  {commentsCount}
                </span>
              </h3>

              {commentsCount === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                  <FaComment className="text-slate-300 text-3xl mx-auto mb-3" />
                  <p className="text-sm text-slate-400 font-medium">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {post.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {(comment.author?.username || "S").charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-bold text-slate-800">
                            {comment.author?.username || "StoryFlow Member"}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {new Date(comment.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line pl-10">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Back to posts link bottom */}
        <div className="text-center mt-12">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
          >
            <FaArrowLeft size="12" />
            Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
