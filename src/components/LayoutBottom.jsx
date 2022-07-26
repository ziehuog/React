import React, { useContext } from "react";
import { Context } from "./Context";

const LayoutBottom = () => {

  const { displaySubmit, displayNext, nextButton , buttonBack, buttonNext, buttonSubmit} = useContext(Context)



  return (
      <div className="flex justify-around py-7">
      <button
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={buttonBack}
      >
        Back
      </button>

      <button
        className="border border-gray-400 rounded-[8px] py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={buttonNext}
        disabled ={nextButton}
        style = {{display: `${displayNext}`}}
      >
        Next
      </button>
      <button
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-slate-600 hover:text-white"
        onClick={buttonSubmit}
        style = {{display: `${displaySubmit}`}}

      >
        Preview
      </button>
    </div>
  );
};

export default LayoutBottom;
