import React, { useContext, useState, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { DATA } from "../utils/data";
import SubmitScreen from "./SubmitScreen";
import TestQuestion from "./TestQuestion";


// const index = useContext(indexContext);
const LayoutBottom = (onButtonBack, onButtonNext, onSubmit) => {

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
        > Next
          {/* {" "}
          {nextButton} */}
        </div>
        <button onClick={onSubmit}>Submit</button>
      </div>
  );
};

export default LayoutBottom;
