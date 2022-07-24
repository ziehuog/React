import React from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  let navigate = useNavigate();

  const navigateToTest = () => {
    navigate("/question");
  };
  return (
    <div className="mt-[150px]">
      <div className="text-[30px] text-center py-[30px]">
        Click <b>Start</b> to start the test!
      </div>

      <div className="text-center">
        <button
          className="text-[24px] border rounded-[8px] cursor-pointer py-1 px-8 hover:bg-slate-600 hover:text-white"
          onClick={navigateToTest}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
