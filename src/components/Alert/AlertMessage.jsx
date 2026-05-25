import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const AlertMessage = ({ type, message }) => {
  let icon;
  let colorClass;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-rose-600 text-xl sm:text-2xl shrink-0" />;
      colorClass = "bg-rose-50/80 border border-rose-100 text-rose-800";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="text-emerald-600 text-xl sm:text-2xl shrink-0" />;
      colorClass = "bg-emerald-50/80 border border-emerald-105 text-emerald-800";
      break;
    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="animate-spin text-indigo-600 text-lg sm:text-xl shrink-0" />
      );
      colorClass = "bg-indigo-50/80 border border-indigo-100 text-indigo-850";
      break;
    default:
      icon = null;
      colorClass = "bg-slate-50 border border-slate-200 text-slate-700";
  }

  return (
    <div className={`flex items-center p-3.5 sm:p-4 rounded-2xl shadow-sm ${colorClass} space-x-3.5 transition-all duration-300 w-full animate-fade-in`}>
      <div className="flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="text-xs sm:text-sm font-bold leading-relaxed">{message}</span>
    </div>
  );
};

export default AlertMessage;
