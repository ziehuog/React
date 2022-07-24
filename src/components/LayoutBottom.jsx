import React from "react";

const LayoutBottom = ({ onButtonBack, onButtonNext, nextButton }) => {
  return (
    <div className="flex justify-around py-7">
      <div
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={onButtonBack}
      >
        Back
      </div>

      <div
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={onButtonNext}
      >
        {" "}
        {nextButton}
      </div>
    </div>
  );
};

export default LayoutBottom;
