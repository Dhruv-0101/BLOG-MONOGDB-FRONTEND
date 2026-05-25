import { useMutation } from "@tanstack/react-query";
import React from "react";
import * as Yup from "yup";
import { AiOutlineMail, AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../APIServices/users/usersAPI";
import { useFormik } from "formik";
import AlertMessage from "../Alert/AlertMessage";
import { FaBlog } from "react-icons/fa";

const RequestResetPassword = () => {
  const navigate = useNavigate();

  const userMutation = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: forgotPasswordAPI,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email address is required"),
    }),
    onSubmit: (values) => {
      userMutation.mutateAsync(values.email).catch((err) => console.log(err));
    },
  });

  const isLoading = userMutation.isPending;
  const isSuccess = userMutation.isSuccess;
  const isError = userMutation.isError;
  const errorMsg = userMutation?.error?.response?.data?.message || "Something went wrong. Please try again.";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50/40 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden antialiased">
      {/* Background Soft Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200/30 via-indigo-200/30 to-purple-100/20 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200/30 via-rose-100/30 to-amber-100/20 rounded-full blur-[130px] opacity-60 pointer-events-none z-0" />

      {/* Main Glassmorphic Container Card */}
      <div className="bg-white border border-slate-150/60 rounded-3xl p-8 sm:p-10 shadow-xl shadow-indigo-100/20 max-w-md w-full relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2.5 mx-auto">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <FaBlog size="18" />
            </div>
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">
              Story<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Flow</span>
            </span>
          </Link>
          <div className="space-y-1.5 pt-2">
            <h2 className="text-2xl font-black text-slate-850 tracking-tight">
              Forgot Password?
            </h2>
            <p className="text-xs font-semibold text-slate-450 leading-relaxed max-w-xs mx-auto">
              Enter your registered email address below, and we will send you a secure link to reset your password.
            </p>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-2">
          {isLoading && (
            <AlertMessage type="loading" message="Sending reset link, please wait..." />
          )}
          {isSuccess && (
            <AlertMessage
              type="success"
              message={userMutation.data?.message || "Reset link sent successfully to your email!"}
            />
          )}
          {isError && (
            <AlertMessage type="error" message={errorMsg} />
          )}
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <AiOutlineMail className="absolute left-4 text-indigo-500 text-lg pointer-events-none" />
              <input
                type="email"
                id="email"
                placeholder="e.g. writer@storyflow.com"
                {...formik.getFieldProps("email")}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200/80 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all focus:ring-4 focus:ring-indigo-50"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs font-bold text-rose-600 mt-1.5 pl-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-755 hover:to-purple-755 shadow-md shadow-indigo-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Send Reset Link
          </button>
        </form>

        {/* Navigation Helpers */}
        <div className="border-t border-slate-100 pt-5 flex items-center justify-between text-xs">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <AiOutlineArrowLeft className="text-sm" />
            <span>Back to Sign In</span>
          </Link>
          <Link
            to="/"
            className="font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RequestResetPassword;
