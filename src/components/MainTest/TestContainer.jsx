import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../Auth/User";
import AnswerProcess from "./AnswerProcess";
import LayoutBottom from "./LayoutBottom";
import TestQuestion from "./TestQuestion";
import Timer from "./Timer";

const TestContainer = () => {

  let navigate = useNavigate();


  const navigateToSubmit = () => {
    navigate("/submit");
    console.log("submit");
  };

  return (
    <Fragment>
      <User/>
      <div className="App bg-gradient-to-b from-indigo-500 py-[70px] w-[100vw] h-full">
  
  <div className="bg-gray-100/80 rounded-[20px] drop-shadow-xl w-[65vw] m-auto ">
    <Timer />
    <AnswerProcess />
    <TestQuestion />
    <LayoutBottom onSubmit={navigateToSubmit} />
  </div>
</div>
    </Fragment>
  );
};

export default TestContainer;
