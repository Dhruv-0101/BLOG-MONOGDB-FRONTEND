import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { addCategoryAPI } from "../../APIServices/category/categoryAPI";
import AlertMessage from "../Alert/AlertMessage";
import { FaTags } from "react-icons/fa";

const AddCategory = () => {
  // category mutation
  const categoryMutation = useMutation({
    mutationKey: ["add-category"],
    mutationFn: addCategoryAPI,
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .min(2, "Category name must be at least 2 characters")
        .required("Category name is required"),
    }),
    onSubmit: (values) => {
      categoryMutation.mutate(values);
    },
  });

  const isLoading = categoryMutation.isPending;
  const isSuccess = categoryMutation.isSuccess;
  const isError = categoryMutation.isError;
  const errorMsg = categoryMutation?.error?.response?.data?.message || "Failed to create category.";

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <FaTags size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Add Category</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Create tags to organize and filter articles.
            </p>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-4 space-y-2">
          {isLoading && (
            <AlertMessage type="loading" message="Creating category tag..." />
          )}
          {isSuccess && (
            <AlertMessage
              type="success"
              message="Category tag created successfully!"
            />
          )}
          {isError && <AlertMessage type="error" message={errorMsg} />}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          
          {/* Category Name Input */}
          <div>
            <label htmlFor="categoryName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="e.g. Technology, Health, Business"
              {...formik.getFieldProps("categoryName")}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200/80 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all focus:ring-4 focus:ring-indigo-50"
            />
            {formik.touched.categoryName && formik.errors.categoryName && (
              <p className="text-xs font-bold text-rose-600 mt-1.5 pl-1">
                {formik.errors.categoryName}
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
