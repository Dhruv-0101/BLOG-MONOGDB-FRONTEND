import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPlanAPI } from "../../APIServices/plans/plans";
import { userProfileAPI } from "../../APIServices/users/usersAPI";
import AlertMessage from "../Alert/AlertMessage";
import { FaCalendarPlus, FaTimesCircle } from "react-icons/fa";

const CreatePlan = () => {
  const navigate = useNavigate();

  // Fetch profile to verify if user is admin
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileAPI,
  });

  const isAdmin = profileData?.user?.username === "dhruv";

  // Redirect non-admins to dashboard
  useEffect(() => {
    if (!isProfileLoading && profileData && !isAdmin) {
      navigate("/dashboard");
    }
  }, [profileData, isProfileLoading, isAdmin, navigate]);

  // Features list state
  const [features, setFeatures] = useState([""]);

  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  // user mutation
  const planMutation = useMutation({
    mutationKey: ["create-plan"],
    mutationFn: createPlanAPI,
  });

  const formik = useFormik({
    initialValues: {
      planName: "Free",
      price: "",
    },
    validationSchema: Yup.object({
      planName: Yup.string().required("Plan Name is required"),
      price: Yup.number()
        .min(0, "Price cannot be negative")
        .required("Price is required"),
    }),
    onSubmit: async (values) => {
      // Filter out any empty features
      const activeFeatures = features.filter((f) => f.trim() !== "");
      if (activeFeatures.length === 0) {
        alert("Please add at least one feature description");
        return;
      }

      const planData = {
        planName: values.planName,
        features: activeFeatures,
        price: values.price,
      };

      planMutation
        .mutateAsync(planData)
        .then(() => {
          navigate("/pricing");
        })
        .catch((err) => console.log(err));
    },
  });

  const isLoading = planMutation.isPending;
  const isSuccess = planMutation.isSuccess;
  const isError = planMutation.isError;
  const errorMsg =
    planMutation?.error?.response?.data?.message || "Failed to create plan.";

  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Double check in render to avoid flickering form before redirect
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="bg-white/70 backdrop-blur-md border border-slate-100/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <FaCalendarPlus size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Create Subscription
            </h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Configure subscription tiers for your readers.
            </p>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-4 space-y-2">
          {isLoading && (
            <AlertMessage
              type="loading"
              message="Creating subscription tier..."
            />
          )}
          {isSuccess && (
            <AlertMessage
              type="success"
              message="Plan created successfully! Redirecting..."
            />
          )}
          {isError && <AlertMessage type="error" message={errorMsg} />}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Plan Name Selector */}
          <div>
            <label
              htmlFor="planName"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
            >
              Plan Tier Type
            </label>
            <select
              id="planName"
              {...formik.getFieldProps("planName")}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200/80 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all focus:ring-4 focus:ring-indigo-50"
            >
              <option value="Free">Free Tier</option>
              <option value="Premium">Premium Tier</option>
            </select>
            {formik.touched.planName && formik.errors.planName && (
              <p className="text-xs font-bold text-rose-600 mt-1.5 pl-1">
                {formik.errors.planName}
              </p>
            )}
          </div>

          {/* Dynamic Tier Features List */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Tier Features
            </label>

            <div className="space-y-2 mb-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    placeholder={`e.g. Feature #${index + 1}`}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-slate-50/50 border border-slate-200/80 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all focus:ring-4 focus:ring-indigo-50"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      title="Remove feature"
                    >
                      <FaTimesCircle size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddFeature}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-650 hover:text-indigo-700 transition-colors pl-1"
            >
              + Add Feature Option
            </button>
          </div>

          {/* Price Input */}
          <div>
            <label
              htmlFor="price"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2"
            >
              Monthly Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-sm">
                $
              </span>
              <input
                type="number"
                id="price"
                placeholder="0.00"
                {...formik.getFieldProps("price")}
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50/50 border border-slate-200/80 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all focus:ring-4 focus:ring-indigo-50"
              />
            </div>
            {formik.touched.price && formik.errors.price && (
              <p className="text-xs font-bold text-rose-600 mt-1.5 pl-1">
                {formik.errors.price}
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-100 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Create Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
