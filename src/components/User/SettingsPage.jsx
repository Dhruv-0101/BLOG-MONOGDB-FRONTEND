import React from "react";
import { FaUserCircle, FaEnvelope, FaChevronRight, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 antialiased">
      {/* Header section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-650 shadow-inner">
          <FaCog className="h-5 w-5 animate-spin-slow" style={{ animationDuration: '8s' }} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Account Settings</h1>
          <p className="text-xs font-semibold text-slate-450 mt-0.5">
            Manage your personal profile picture, verified email address, and notifications.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        {/* Upload profile photo */}
        <Link to="/dashboard/upload-profile-photo" className="group block">
          <div className="bg-white/70 backdrop-blur-md border border-slate-100 hover:border-indigo-200/50 rounded-2xl p-5 hover:bg-white/95 hover:scale-[1.005] shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-100/70 rounded-xl flex items-center justify-center text-indigo-600 shadow-inner transition-colors">
              <FaUserCircle size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-slate-800 font-bold text-sm sm:text-base group-hover:text-indigo-650 transition-colors">
                Update Profile Photo
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-0.5 leading-relaxed">
                Change or upload your custom writer avatar picture displayed publicly on all your stories.
              </p>
            </div>
            <div className="text-slate-400 group-hover:text-indigo-500 transition-colors pl-2">
              <FaChevronRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Add email */}
        <Link to="/dashboard/add-email" className="group block">
          <div className="bg-white/70 backdrop-blur-md border border-slate-100 hover:border-indigo-200/50 rounded-2xl p-5 hover:bg-white/95 hover:scale-[1.005] shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-100/70 rounded-xl flex items-center justify-center text-indigo-600 shadow-inner transition-colors">
              <FaEnvelope size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-slate-800 font-bold text-sm sm:text-base group-hover:text-indigo-650 transition-colors">
                Update Email Address
              </h3>
              <p className="text-slate-500 text-xs font-medium mt-0.5 leading-relaxed">
                Configure your official billing and mailing email address to receive important platform updates.
              </p>
            </div>
            <div className="text-slate-400 group-hover:text-indigo-500 transition-colors pl-2">
              <FaChevronRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
