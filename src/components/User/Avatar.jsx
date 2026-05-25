import React from "react";
import { FaUser } from "react-icons/fa";

const Avatar = () => {
  return (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400/80 shrink-0">
      <FaUser className="h-[45%] w-[45%]" />
    </div>
  );
};

export default Avatar;
