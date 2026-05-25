import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";
import { BASE_URL } from "../../utils/baseEndpoint";
import { FaBlog, FaLock, FaUser } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const userMutation = useMutation({
    mutationKey: ["user-registration"],
    mutationFn: loginAPI,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      userMutation
        .mutateAsync(values)
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="relative h-[calc(100vh-4.5rem)] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-200 to-purple-100 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-60 pointer-events-none z-0" />

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 md:p-8 rounded-3xl z-10">
        {/* Brand Header */}
        <div className="text-center mb-5">
          <div className="inline-flex w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-white shadow-md mb-2">
            <FaBlog size="20" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to your StoryFlow account
          </p>
        </div>

        {/* Alert Messages */}
        {userMutation.isPending && (
          <div className="mb-4">
            <AlertMessage type="loading" message="Verifying credentials..." />
          </div>
        )}
        {userMutation.isSuccess && (
          <div className="mb-4">
            <AlertMessage type="success" message="Success! Redirecting..." />
          </div>
        )}
        {userMutation.isError && (
          <div className="mb-4">
            <AlertMessage
              type="error"
              message={
                userMutation?.error?.response?.data?.message ||
                "Invalid details"
              }
            />
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label
              className="block text-sm font-bold text-slate-700 mb-1.5"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FaUser size="14" />
              </span>
              <input
                id="username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white/50"
                type="text"
                placeholder="Enter username"
                {...formik.getFieldProps("username")}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <p className="text-xs text-red-500 mt-1 font-semibold">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                className="block text-sm font-bold text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <Link
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <FaLock size="14" />
              </span>
              <input
                id="password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white/50"
                type="password"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1 font-semibold">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-md shadow-indigo-100 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 mt-2"
            type="submit"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
              or
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Google Auth Link */}
          <a
            href={`${BASE_URL}/users/auth/google`}
            className="w-full py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-350 shadow-sm flex items-center justify-center gap-3 transition-all duration-200 text-slate-700 font-bold hover:scale-[1.01] active:scale-[0.99]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M10.5003 1.91667C12.5358 1.91667 14.3903 2.67493 15.8117 3.91839L13.8037 5.92643C12.9021 5.19326 11.7542 4.75001 10.5003 4.75001C7.601 4.75001 5.25033 7.10068 5.25033 10C5.25033 12.8993 7.601 15.25 10.5003 15.25C12.7863 15.25 14.7244 13.7867 15.4456 11.7501L15.5636 11.4167H15.2099H10.7503V8.58334H17.7503V8.61792H18.0003H18.4637C18.5415 9.06752 18.5837 9.52907 18.5837 10C18.5837 14.464 14.9643 18.0833 10.5003 18.0833C6.03631 18.0833 2.41699 14.464 2.41699 10C2.41699 5.53599 6.03631 1.91667 10.5003 1.91667Z"
                fill="#FFC107"
                stroke="#FFC107"
                strokeWidth="0.5"
              />
              <path
                d="M3.12793 6.12125L5.86585 8.12917C6.60668 6.29501 8.40085 5.00001 10.5004 5.00001C11.775 5.00001 12.9346 5.48084 13.8175 6.26625L16.1746 3.90917C14.6863 2.52209 12.6954 1.66667 10.5004 1.66667C7.2996 1.66667 4.52376 3.47375 3.12793 6.12125Z"
                fill="#FF3D00"
              />
              <path
                d="M10.4998 18.3333C12.6523 18.3333 14.6081 17.5096 16.0869 16.17L13.5077 13.9875C12.6429 14.6452 11.5862 15.0009 10.4998 15C8.3323 15 6.49189 13.6179 5.79855 11.6892L3.08105 13.7829C4.46022 16.4817 7.26105 18.3333 10.4998 18.3333Z"
                fill="#4CAF50"
              />
              <path
                d="M18.6713 8.36791H18V8.33333H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.9879L13.5079 13.9871L16.0871 16.1696C15.9046 16.3354 18.8333 14.1667 18.8333 9.99999C18.8333 9.44124 18.7758 8.89583 18.6713 8.36791Z"
                fill="#1976D2"
              />
            </svg>
            <span>Sign in with Google</span>
          </a>
        </form>

        {/* Footer Toggle */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
