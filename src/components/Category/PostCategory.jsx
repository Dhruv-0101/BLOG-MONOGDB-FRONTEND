import React, { useState } from "react";
import { MdClear, MdCategory } from "react-icons/md";

const PostCategory = ({ categories, onCategorySelect, onClearFilters, activeCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeClass = "h-10 inline-flex items-center justify-center w-full sm:w-auto text-center py-2.5 px-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-md shadow-indigo-150 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";
  const inactiveClass = "h-10 inline-flex items-center justify-center w-full sm:w-auto text-center py-2.5 px-5 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-650 hover:bg-slate-50 hover:border-slate-300 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

  const list = categories?.categories || [];
  const limit = 4;
  const visibleCategories = list.slice(0, limit);
  const remainingCategories = list.slice(limit);

  // Checks if the active category is inside the hidden popup list
  const isHiddenCategoryActive = activeCategory && remainingCategories.some(cat => cat._id === activeCategory);

  const handleSelectFromModal = (categoryId) => {
    onCategorySelect(categoryId);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-2.5 mb-10 items-center">
      {/* All Articles Category */}
      <button
        className={!activeCategory ? activeClass : inactiveClass}
        onClick={onClearFilters}
      >
        All Articles
      </button>

      {/* Visible Inline Categories */}
      {visibleCategories.map((category) => {
        const isCurrentActive = activeCategory === category._id;
        return (
          <button
            key={category._id}
            className={isCurrentActive ? activeClass : inactiveClass}
            onClick={() => onCategorySelect(category._id)}
          >
            {category.categoryName}
            <span className={`ml-1.5 text-xs ${isCurrentActive ? "text-indigo-100 font-bold" : "text-slate-400 font-medium"}`}>
              ({category.posts?.length || 0})
            </span>
          </button>
        );
      })}

      {/* "More..." Button if there are additional categories */}
      {remainingCategories.length > 0 && (
        <button
          className={isHiddenCategoryActive ? activeClass : inactiveClass}
          onClick={() => setIsModalOpen(true)}
        >
          {isHiddenCategoryActive 
            ? `${list.find(cat => cat._id === activeCategory)?.categoryName || "More"}...`
            : `More... (${remainingCategories.length})`}
        </button>
      )}

      {/* Categories Select Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          {/* Clickable Backdrop to close */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          
          {/* Modal Card */}
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 flex flex-col max-h-[80vh] z-10 animate-scale-up">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-slate-800">
                <MdCategory className="text-indigo-600" size="20" />
                <h3 className="text-xl font-bold font-sans">More Categories</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all duration-200"
              >
                <MdClear size="18" />
              </button>
            </div>

            {/* Scrollable Categories List */}
            <div className="overflow-y-auto pr-1 flex flex-wrap gap-2.5 max-h-[50vh]">
              {list.map((category) => {
                const isCurrentActive = activeCategory === category._id;
                return (
                  <button
                    key={category._id}
                    className={isCurrentActive ? activeClass : inactiveClass}
                    onClick={() => handleSelectFromModal(category._id)}
                  >
                    {category.categoryName}
                    <span className={`ml-1.5 text-xs ${isCurrentActive ? "text-indigo-100 font-bold" : "text-slate-400 font-medium"}`}>
                      ({category.posts?.length || 0})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer / Info */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-450 text-center">
              Click any category to filter articles. Click outside to dismiss.
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default PostCategory;
