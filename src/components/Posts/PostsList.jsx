import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import "./postCss.css";
import { fetchAllPosts } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import PostCategory from "../Category/PostCategory";
import { fetchCategoriesAPI } from "../../APIServices/category/categoryAPI";
import {
  FaSearch,
  FaRegCalendarAlt,
  FaEye,
  FaThumbsUp,
  FaCommentAlt,
  FaUserCircle,
} from "react-icons/fa";
import { MdClear, MdChevronLeft, MdChevronRight } from "react-icons/md";
import truncateString from "../../utils/truncateString";

const PostsList = () => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ["lists-posts", { ...filters, page }],
    queryFn: () =>
      fetchAllPosts({ ...filters, title: searchTerm, page, limit: 6 }),
  });

  const handleCategoryFilter = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
    setPage(1);
    refetch();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, title: searchTerm });
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  const { data: categories } = useQuery({
    queryKey: ["category-lists"],
    queryFn: fetchCategoriesAPI,
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white pb-28 pt-14 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-200 to-purple-100 rounded-full blur-[120px] opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-50 pointer-events-none z-0" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            Community Stories
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Latest Articles &amp; Stories
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Explore deep insights, creative thoughts, and coding wisdom shared by our global community of writers.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 max-w-xl"
        >
          <div className="flex-grow flex items-center bg-white/80 backdrop-blur-md border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 rounded-full overflow-hidden px-4 shadow-sm transition-all duration-200">
            <FaSearch className="text-slate-400 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow py-3 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 ml-1"
              >
                <MdClear size="16" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all duration-200 whitespace-nowrap"
            >
              Search
            </button>
            {(Object.keys(filters).length > 0 || searchTerm) && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-5 py-3 rounded-full border border-slate-200 hover:border-slate-300 text-slate-600 text-sm font-semibold transition-all duration-200 whitespace-nowrap bg-white/70"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Category Filter */}
        <PostCategory
          categories={categories}
          onCategorySelect={handleCategoryFilter}
          onClearFilters={clearFilters}
          activeCategory={filters.category}
        />

        {/* Alerts */}
        {data?.posts?.length <= 0 && (
          <div className="my-10 bg-white/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-100 shadow-inner">
            <NoDataFound text="No posts match your search query." />
          </div>
        )}
        {isError && (
          <div className="mb-8">
            <AlertMessage type="error" message="An error occurred while fetching posts. Please try again." />
          </div>
        )}
        {isLoading && (
          <div className="mb-8">
            <AlertMessage type="loading" message="Fetching fresh articles..." />
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {data?.posts?.map((post) => {
            const authorUsername = post?.author?.username || "StoryFlow Creator";
            const authorPic = post?.author?.profilePicture?.path || post?.author?.profilePicture;
            return (
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className="group flex flex-col h-full"
              >
                <article className="bg-white/80 backdrop-blur-sm border border-slate-100 group-hover:border-indigo-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-50/30 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                  {/* Image Banner */}
                  <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
                    <img
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={post?.image?.path || post?.image}
                      alt={post?.title}
                    />
                    {/* Category pill */}
                    {post?.category?.categoryName && (
                      <div className="absolute top-3 left-3 py-1 px-3 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-indigo-600 shadow-sm border border-indigo-50/50 uppercase tracking-wider">
                        {post?.category?.categoryName}
                      </div>
                    )}
                    {/* Gradient overlay bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Creator row */}
                    <div className="flex items-center gap-2.5 mb-4">
                      {authorPic ? (
                        <img
                          src={authorPic}
                          alt={authorUsername}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {authorUsername.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{authorUsername}</p>
                        <p className="text-[10px] text-slate-400">Author</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div
                      className="text-slate-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: truncateString(post?.description, 130),
                      }}
                    />

                    {/* Meta Row */}
                    <div className="border-t border-slate-100 pt-4 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <FaRegCalendarAlt />
                          {new Date(post.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        {post?.viewers?.length > 0 && (
                          <span className="flex items-center gap-1">
                            <FaEye />
                            {post.viewers.length}
                          </span>
                        )}
                        {post?.likes?.length > 0 && (
                          <span className="flex items-center gap-1">
                            <FaThumbsUp className="text-indigo-400" />
                            {post.likes.length}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-0.5 transition-colors duration-200">
                        Read{" "}
                        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        {data?.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4 border-t border-slate-100 pt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                page <= 1
                  ? "opacity-40 cursor-not-allowed text-slate-300 border-slate-100"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              }`}
            >
              <MdChevronLeft size="24" />
            </button>
            <span className="text-sm font-semibold text-slate-600">
              Page <span className="text-slate-900 font-bold">{page}</span> of{" "}
              <span className="text-slate-900 font-bold">{data?.totalPages}</span>
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= data?.totalPages}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                page >= data?.totalPages
                  ? "opacity-40 cursor-not-allowed text-slate-300 border-slate-100"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              }`}
            >
              <MdChevronRight size="24" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostsList;
