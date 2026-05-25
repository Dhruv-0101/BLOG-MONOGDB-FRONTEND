import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { paymentIntentAPI } from "../../APIServices/stripe/plans";
import { fetchPlanAPI } from "../../APIServices/plans/plans";
import AlertMessage from "../Alert/AlertMessage";
import { FaBlog, FaShieldAlt, FaRegCreditCard, FaLock, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const CheckoutForm = () => {
  // Get the id of the plan
  const { planId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch specific plan details
  const { data: planData, isLoading: isPlanLoading } = useQuery({
    queryKey: ["checkout-plan", planId],
    queryFn: () => fetchPlanAPI(planId),
  });

  const plan = planData?.planFound;

  // Stripe Payment Mutation
  const paymentMutation = useMutation({
    mutationKey: ["checkout"],
    mutationFn: paymentIntentAPI,
  });

  // Configure stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // Handle submit for payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setErrorMessage(submitErr.message);
      return;
    }

    try {
      paymentMutation
        .mutateAsync(planId)
        .then(async (data) => {
          const { error } = await stripe.confirmPayment({
            elements,
            clientSecret: data?.clientSecret,
            confirmParams: {
              return_url: window.location.origin + "/success",
            },
          });
          if (error) {
            setErrorMessage(error.message);
          }
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage(err?.response?.data?.message || "Payment initiation failed. Please try again.");
        });
    } catch (err) {
      setErrorMessage(err?.message || "An unexpected error occurred.");
    }
  };

  const isPending = paymentMutation.isPending;

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] w-full flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-8 overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-violet-200 via-indigo-150 to-purple-100 rounded-full blur-[120px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 rounded-full blur-[130px] opacity-65 pointer-events-none z-0" />

      {/* Main glass card container */}
      <div className="relative w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-white shadow-2xl p-6 md:p-8 rounded-3xl z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch animate-scale-in">
        
        {/* Left Column: Order Summary (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
          <div>
            {/* Back link */}
            <Link 
              to="/pricing" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6 group"
            >
              <FaArrowLeft className="transform group-hover:-translate-x-0.5 transition-transform" size="10" />
              Back to plans
            </Link>

            {/* Brand logo header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <FaBlog size="14" />
              </div>
              <span className="font-extrabold text-slate-800 tracking-tight text-base">
                StoryFlow Billing
              </span>
            </div>

            {/* Plan details info */}
            {isPlanLoading ? (
              <div className="space-y-4 animate-pulse py-4">
                <div className="h-6 bg-slate-200 rounded w-2/3" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-16 bg-slate-100 rounded-2xl" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                    Lifetime Plan
                  </span>
                  <h3 className="text-2xl font-black text-slate-850 tracking-tight">
                    {plan?.planName || "Premium"} Access
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-1">
                    Unlock unlimited stories, ranking podium, and writer earnings.
                  </p>
                </div>

                {/* Features recap list */}
                <div className="bg-indigo-50/20 border border-indigo-100/30 p-4 rounded-2xl space-y-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 block mb-1">
                    Features Included:
                  </span>
                  {plan?.features?.slice(0, 3).map((feat, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                      <FaCheckCircle className="text-indigo-500 shrink-0 mt-0.5" size="12" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {plan?.features?.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-semibold pl-4">
                      + {plan.features.length - 3} more premium benefits
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Breakdown summary */}
          <div className="mt-8">
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>Subtotal</span>
                <span>${plan?.price ? `${plan.price}.00` : "10.99"}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>Processing Fees</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>Tax</span>
                <span>Included</span>
              </div>
              
              <div className="border-t border-dashed border-slate-100 pt-4 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">Total Due</span>
                <span className="text-2xl font-black text-indigo-600">
                  ${plan?.price ? `${plan.price}.00` : "$10.99"}
                </span>
              </div>
            </div>

            {/* Shield disclaimer */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-6 bg-slate-50 border border-slate-150 p-2.5 rounded-xl">
              <FaShieldAlt className="text-emerald-500 shrink-0" size="13" />
              <span>Payments are encrypted &amp; processed via Stripe.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Stripe Payment Form (7 cols) */}
        <form onSubmit={handleSubmit} className="md:col-span-7 flex flex-col justify-between py-1">
          <div className="space-y-6">
            
            {/* Form Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <FaRegCreditCard className="text-indigo-500" size="18" />
              <span className="font-bold text-slate-800 tracking-tight text-sm uppercase">
                Payment Details
              </span>
            </div>

            {/* Status alerts */}
            <div className="space-y-2">
              {isPending && (
                <AlertMessage type="loading" message="Processing transaction, please wait..." />
              )}
              {paymentMutation.isError && (
                <AlertMessage 
                  type="error" 
                  message={paymentMutation?.error?.response?.data?.message || "Failed to process payment."} 
                />
              )}
              {errorMessage && (
                <AlertMessage type="error" message={errorMessage} />
              )}
            </div>

            {/* Stripe Card Input Container */}
            <div className="bg-slate-50/30 border border-slate-200/60 p-4 sm:p-5 rounded-2xl">
              <PaymentElement />
            </div>

          </div>

          {/* Submit Action */}
          <div className="mt-8">
            <button 
              type="submit"
              disabled={isPending || !stripe || !elements}
              className="w-full py-4 rounded-full text-white font-extrabold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              Pay ${plan?.price ? `${plan.price}.00` : "10.99"} Now
            </button>

            {/* SSL badge */}
            <p className="text-[10px] font-bold text-slate-400 text-center mt-4 flex items-center justify-center gap-1">
              <FaLock size="10" className="text-slate-400" /> SSL Secured Checkout
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutForm;
