import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DATA } from "../utils/data";
import AnswerProcess from "./AnswerProcess";
import LayoutBottom from "./LayoutBottom";
import TestQuestion from "./TestQuestion";

const TestContainer = () => {
  const [index, setIndex] = useState(0);
  const [nextButton, setNextButton] = useState("Next");
  const [score, setScore] = useState(0)
  let navigate = useNavigate();

  let indexQuestion = DATA[index].answers
  indexQuestion.map((answer) => {
    if(answer.isTrue === true) {
      // setScore(score + 1 )
      // console.log(answer.id)
      // console.log(score);

      
    }
  })


  const choosingAnswer = (e) => {
    console.log(e.target.value)
  }

  //Button Next

  const buttonNext = () => {
    setIndex(index + 1);
    setNextButton("Next");

    if (index >= DATA.length - 1) {
      setIndex(DATA.length - 1);
      setNextButton("Preview");
      navigateToSubmit();
    } else if (index === DATA.length - 2) {
      setNextButton("Preview");
    }
  };

  //Button Back
  const buttonBack = () => {
    setIndex(index - 1);
    setNextButton("Next");

    if (index <= 0) {
      setIndex(0);
    }
  };

  const navigateToSubmit = () => {
    navigate("/submit");
    console.log("submit");
  };

  return (
    <div className="App bg-gray-300 py-[70px]">
      <div className="bg-[#fff] rounded-[20px] drop-shadow-xl w-[65vw] m-auto ">
        <AnswerProcess index={index} />
        <TestQuestion index={index} 
        onAnswer = {choosingAnswer}
        />
        <LayoutBottom
          onButtonBack={buttonBack}
          onButtonNext={buttonNext}
          onSubmit={navigateToSubmit}
          nextButton={nextButton}
        />
      </div>
    </div>
  );
};

export default TestContainer;
