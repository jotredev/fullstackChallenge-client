import React from "react";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-[#141517] z-[999999999] flex flex-col items-center justify-center gap-6">
      <span className="loading"></span>
    </div>
  );
};

export default Loading;
