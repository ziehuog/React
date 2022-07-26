import React, { useContext } from "react";
import { Context } from "./Context";

const LayoutBottom = () => {

  const {index, nextButton , buttonBack, buttonNext, buttonSubmit} = useContext(Context)

  // console.log(next)


  return (
      <div className="flex justify-around py-7">
      <div
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={buttonBack}
      >
        Back
      </div>

      <div
        className="border border-gray-400 rounded-[8px]  py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={buttonNext}
        style={{cursor: `${nextButton}`}}
      >
        Next
      </div>
      <div
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={buttonSubmit}
      >
        Submit
      </div>
    </div>
  );
};

export default LayoutBottom;
