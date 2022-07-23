import React from 'react';
import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AnswerProcess from "./AnswerProcess";
import LayoutBottom from "./LayoutBottom";
import SubmitScreen from "./SubmitScreen";
import { DATA } from "../utils/data";
import TestQuestion from './TestQuestion';



const ContainerModule = () => {
  const [index, setIndex] = useState(0);
  const [nextButton, setNextButton] = useState("Next");
  let navigate = useNavigate();

  //Button Next
  console.log(index);

  const buttonNext = () => {
    setIndex(index + 1);
    setNextButton("Next");

    if (index >= DATA.length - 1) {
      setIndex(DATA.length - 1);
      setNextButton("Submit");
    } else if (index === DATA.length - 2) {
      setNextButton("Submit");
    }
  };

  const navigateToSubmit = () => {
    navigate("/submit");
    // setHide('hidden')
  };

  //Button Back
  const buttonBack = () => {
    setIndex(index - 1);
    setNextButton("Next");

    if (index <= 0) {
      setIndex(0);
      console.log("end");
    }
  };

  return (
    <div className="App bg-slate-500">
      <div className="bg-[#fff] rounded-[20px] drop-shadow-xl">
      {/* <indexContext.Provider value={index}>
        <indexContext.Consumer> */}
          <AnswerProcess index = {index}/>
          
            <Routes>
              <Route path="/question/:index" element={<TestQuestion index={index}/>}/>
              <Route path="/submit" element={<SubmitScreen />} />
            </Routes>
          <LayoutBottom onButtonBack={buttonBack} onButtonNext = {buttonNext} onSubmit = {navigateToSubmit}/>
        {/* </indexContext.Consumer>
      </indexContext.Provider> */}
      </div>
    </div>
  );
};

export default ContainerModule;
