import React from "react";
import { useNavigate } from "react-router-dom";
import AnswerProcess from "./AnswerProcess";
import LayoutBottom from "./LayoutBottom";
import TestQuestion from "./TestQuestion";


const TestContainer = () => {
  let navigate = useNavigate();


  const navigateToSubmit = () => {
    navigate("/submit");
    console.log("submit");
  };

  return (
      <div className="App bg-gray-300 py-[70px] w-[100vw] h-[100vh]">
      <div className="bg-[#fff] rounded-[20px] drop-shadow-xl w-[65vw] m-auto ">
        <AnswerProcess />
        <TestQuestion   />
        <LayoutBottom
          onSubmit={navigateToSubmit}
        />
      </div>
    </div>
  );
};

export default TestContainer;
