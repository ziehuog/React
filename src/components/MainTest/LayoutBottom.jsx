import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BTN_BACK, BTN_NEXT } from "../Share/Constants";
import { questionContext } from "../Share/Context/QuestionContext";

const LayoutBottom = () => {
  const navigate = useNavigate();

  const { state, dispatch, currentSubject } = useContext(questionContext);
  const {displayBack,displayNext, displaySubmit  } = state


  return (
    <div className="flex justify-around py-7">
      <button
        style={{ visibility: `${displayBack}` }}
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-indigo-600/60 hover:text-white"
        onClick={() => dispatch({type: BTN_BACK})  }
      >
        Back
      </button>

      <button
        className="border border-gray-400 rounded-[8px] py-2 px-4 hover:bg-indigo-600/60 hover:text-white"
        onClick={ () => dispatch({type: BTN_NEXT})}
        style={{ display: `${displayNext}` }}
      >
        Next
      </button>
      <button
        className="border border-gray-400 rounded-[8px] cursor-pointer py-2 px-4 hover:bg-indigo-600/60 hover:text-white"
        onClick={() => navigate(`/submit/${currentSubject}`)}
        style={{ display: `${displaySubmit}` }}
      >
        Preview
      </button>
    </div>
  );
};

export default LayoutBottom;
