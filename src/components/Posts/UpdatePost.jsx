import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTimesCircle, FaCloudUploadAlt, FaPenNib } from "react-icons/fa";
import Select from "react-select";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchPost,
  updatePostAPI,
} from "../../APIServices/posts/postsAPI";
import AlertMessage from "../Alert/AlertMessage";
import { fetchCategoriesAPI } from "../../APIServices/category/categoryAPI";
import { useParams, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // fetch the post details
  const { data: postDetails, isLoading: isDetailsLoading } = useQuery({
    queryKey: ["post-details", postId],
    queryFn: () => fetchPost(postId),
  });

  const [description, setDescription] = useState("");
  const [imageError, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Initialize description state when details load
  useEffect(() => {
    if (postDetails?.postFound?.description) {
      setDescription(postDetails.postFound.description);
    }
    if (postDetails?.postFound?.image?.path) {
      setImagePreview(postDetails.postFound.image.path);
    }
  }, [postDetails]);

  // post mutation
  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });

  const formik = useFormik({
    initialValues: {
      description: postDetails?.postFound?.description || "",
      image: "",
      category: postDetails?.postFound?.category || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Cover image is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", values.image);
      formData.append("category", values.category);
      postMutation.mutate({ formData, postId });
    },
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["category-lists"],
    queryFn: fetchCategoriesAPI,
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;

    if (file.size > 5242880) {
      setImageErr("File size exceeds 5MB");
      return;
    }

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageErr("Invalid file type. Please upload a PNG or JPG cover image.");
      return;
    }

    setImageErr("");
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const errorMsg = postMutation?.error?.response?.data?.message || "Failed to update article.";

  // React Select Custom Styling
  const customSelectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "#6366f1" : "#e2e8f0",
      borderRadius: "0.75rem",
      padding: "2px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(99, 102, 241, 0.08)" : "none",
      backgroundColor: "rgba(248, 250, 252, 0.5)",
      "&:hover": {
        borderColor: "#6366f1",
      },
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      borderRadius: "1rem",
      overflow: "hidden",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
      border: "1px solid #f1f5f9",
      zIndex: 40,
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? "#6366f1"
        : state.isFocused
        ? "#f8fafc"
        : "white",
      color: state.isSelected ? "white" : "#475569",
      fontWeight: state.isSelected ? "bold" : "500",
      fontSize: "14px",
      cursor: "pointer",
    }),
  };

  if (isDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Editor Styles Override */}
      <style>{`
        .ql-custom-container .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #f1f5f9;
          background: #f8fafc;
          border-top-left-radius: 0.95rem;
          border-top-right-radius: 0.95rem;
        }
        .ql-custom-container .ql-container.ql-snow {
          border: none;
          min-height: 220px;
          max-height: 400px;
          overflow-y: auto;
          font-size: 14.5px;
          color: #334155;
          font-family: inherit;
        }
        .ql-custom-container .ql-editor {
          min-height: 220px;
        }
      `}</style>

      <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <FaPenNib size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Edit Post</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Modify your story details, change the category tag, or upload a new thumbnail.
            </p>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-6 space-y-2">
          {isLoading && (
            <AlertMessage type="loading" message="Saving modifications..." />
          )}
          {isSuccess && (
            <AlertMessage type="success" message="Story updated successfully!" />
          )}
          {isError && <AlertMessage type="error" message={errorMsg} />}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
          {/* Category Input */}
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Select Category
            </label>
            <Select
              name="category"
              placeholder="Select a category tag..."
              styles={customSelectStyles}
              options={categoriesData?.categories?.map((category) => ({
                value: category._id,
                label: category.categoryName,
              }))}
              onChange={(option) => {
                formik.setFieldValue("category", option.value);
              }}
              value={categoriesData?.categories?.find(
                (option) => option._id === formik.values.category
              ) ? {
                value: formik.values.category,
                label: categoriesData.categories.find(option => option._id === formik.values.category).categoryName
              } : categoriesData?.categories?.find(
                (option) => option._id === postDetails?.postFound?.category
              ) ? {
                value: postDetails?.postFound?.category,
                label: categoriesData.categories.find(option => option._id === postDetails?.postFound?.category).categoryName
              } : null}
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-xs font-bold text-rose-600 pl-1">{formik.errors.category}</p>
            )}
          </div>

          {/* Description Input (ReactQuill) */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Article Content
            </label>
            <div className="rounded-2xl border border-slate-200 bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50/50 transition-all overflow-hidden ql-custom-container">
              <ReactQuill
                value={formik.values.description}
                onChange={(value) => {
                  setDescription(value);
                  formik.setFieldValue("description", value);
                }}
                placeholder="Write your story content here..."
                className="bg-white"
              />
            </div>
            {formik.touched.description && formik.errors.description && (
              <p className="text-xs font-bold text-rose-600 pl-1">{formik.errors.description}</p>
            )}
          </div>

          {/* Cover Image Upload Area */}
          <div className="space-y-2">
            <label
              htmlFor="images"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Article Cover Image
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-250 hover:border-indigo-400 bg-slate-50/40 rounded-2xl p-6 transition-colors relative">
              <input
                id="images"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {!imagePreview ? (
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center cursor-pointer w-full text-center py-4"
                >
                  <FaCloudUploadAlt className="text-indigo-500 text-4xl mb-2" />
                  <span className="text-slate-750 text-sm font-bold">Choose a cover image</span>
                  <span className="text-slate-400 text-xs font-semibold mt-1">PNG, JPG or JPEG (Max 5MB)</span>
                </label>
              ) : (
                <div className="relative flex flex-col items-center mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-48 object-cover rounded-xl shadow-sm ring-1 ring-slate-100"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white hover:bg-slate-50 border border-slate-100 text-rose-500 rounded-full p-1.5 shadow-sm transition-all"
                    title="Remove image"
                  >
                    <FaTimesCircle size={16} />
                  </button>
                </div>
              )}
            </div>

            {formik.touched.image && formik.errors.image && (
              <p className="text-xs font-bold text-rose-600 pl-1">{formik.errors.image}</p>
            )}
            {imageError && (
              <p className="text-xs font-bold text-rose-600 pl-1">{imageError}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/posts")}
              className="flex-1 py-3 rounded-full text-sm font-bold text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-all text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-150 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
