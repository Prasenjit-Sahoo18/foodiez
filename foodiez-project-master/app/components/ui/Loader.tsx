import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-8 h-8 border-4 border-white border-dashed rounded-full animate-spin"></div>
    </div>
  );
};
