import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTimesCircle, FaCloudUploadAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { uplaodProfilePicAPI } from "../../APIServices/users/usersAPI";

const UploadProfilePic = () => {
  const [imageError, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const mutation = useMutation({
    mutationKey: ["upload-profile-pic"],
    mutationFn: uplaodProfilePicAPI,
  });

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Image is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", values.image);
      mutation.mutate(formData);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (!file) return;

    if (file.size > 5242880) {
      setImageErr("File size exceeds 5MB limit");
      return;
    }

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageErr("Invalid file type. Please upload a JPG, JPEG, or PNG image.");
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

  const isLoading = mutation.isPending;
  const isError = mutation.isError;
  const isSuccess = mutation.isSuccess;
  const errorMsg = mutation?.error?.response?.data?.message || "Failed to upload image.";

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-6">
          Upload Profile Picture
        </h2>

        {/* Status Alerts */}
        <div className="mb-4 space-y-2">
          {isLoading && (
            <AlertMessage type="loading" message="Uploading profile picture..." />
          )}
          {isSuccess && (
            <AlertMessage
              type="success"
              message="Profile picture updated successfully!"
            />
          )}
          {isError && <AlertMessage type="error" message={errorMsg} />}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Custom Upload Drop Area */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 bg-slate-50/40 transition-colors relative">
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
                <span className="text-slate-700 text-sm font-bold">Choose a photo</span>
                <span className="text-slate-400 text-xs font-semibold mt-1">PNG, JPG or JPEG (Max 5MB)</span>
              </label>
            ) : (
              <div className="relative flex flex-col items-center mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-28 w-28 object-cover rounded-full ring-4 ring-indigo-50"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-0 top-0 transform translate-x-1/3 -translate-y-1/3 bg-white hover:bg-slate-50 border border-slate-100 text-rose-500 rounded-full p-1.5 shadow-sm transition-all"
                  title="Remove image"
                >
                  <FaTimesCircle size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Validation/Error Messages */}
          {formik.touched.image && formik.errors.image && (
            <p className="text-xs font-bold text-rose-600 text-center">{formik.errors.image}</p>
          )}
          {imageError && (
            <p className="text-xs font-bold text-rose-600 text-center">{imageError}</p>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading || !formik.values.image}
            className="w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Upload Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProfilePic;
