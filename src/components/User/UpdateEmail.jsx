import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { updateEmailAPI } from "../../APIServices/users/usersAPI";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

const AddEmailComponent = () => {
  const mutation = useMutation({ mutationFn: updateEmailAPI });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values.email);
    },
  });

  const isLoading = mutation.isPending;
  const isSuccess = mutation.isSuccess;
  const isError = mutation.isError;
  const errorMsg = mutation?.error?.message || "Failed to update email.";

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-6">
          Add/Update Email
        </h2>

        {/* Status Alerts */}
        <div className="mb-4 space-y-2">
          {isSuccess && (
            <AlertMessage type="success" message="Email address updated successfully!" />
          )}
          {isError && (
            <AlertMessage type="error" message={errorMsg} />
          )}
          {isLoading && (
            <AlertMessage type="loading" message="Updating email address..." />
          )}
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g. writer@storyflow.com"
              {...formik.getFieldProps("email")}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200/80 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all focus:ring-4 focus:ring-indigo-50"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs font-bold text-rose-600 mt-1.5 pl-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Save Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmailComponent;
