import React, { Fragment, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TestContainer from "./TestContainer";
import StartScreen from "./StartScreen";
import SubmitScreen from "./SubmitScreen";
import ScoreScreen from "./ScoreScreen";
import { DATA } from "../utils/data";
import { Context } from "./Context";

const Navigation = () => {
  const [index, setIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [nextButton, setNextButton] = useState("Next");
  const navigate = useNavigate();
  const refAnswer = useRef([]);

  let score = 0;

  //Answer
  const handleAnswer = (id) => (e) => {
    const value = e.target.value;
    setCurrentAnswer(value)
    const a = {
      id,
      answer: value,
    };
    const indexAns = refAnswer.current.findIndex((a) => a.id === id);
    if (indexAns !== -1) {
      refAnswer.current[indexAns].answer = value;
    } else {
      refAnswer.current.push(a);
    }
  };

  let answerKey = refAnswer.current;
  console.log(answerKey);

  // Score
  for (let i = 0; i < DATA.length; i++) {
    for (let j = 0; j < answerKey.length; j++) {
      if (
        DATA[i].id === answerKey[j].id &&
        DATA[i].correctAnswer === answerKey[j].answer
      ) {
        ++score;
      }
    }
  }

  let point = Math.round((score / DATA.length) * 10);

  //Button Next

  const callback = (a) => () => {
    console.log(a);
  };

  const buttonNext = () => {
    setIndex(index + 1);
    const nextQuestion = DATA[index + 1];
    const aIndex = refAnswer.current.findIndex((a) => {
      if (nextQuestion.id === a.id) return true;
    });

    if(aIndex !== -1) {
      setCurrentAnswer(refAnswer.current[aIndex].answer)
    } else {
      setCurrentAnswer(null)
    }

    for (let i = 0; i < DATA.length; i++) {
      callback(DATA[i])();
    }

    setNextButton("Next");

    //
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

  //Navigation
  const navigateToSubmit = () => {
    navigate("/submit");
    console.log("submit");
  };

  return (
    <Context.Provider
      value={{
        index,
        nextButton,
        buttonBack,
        buttonNext,
        handleAnswer,
        refAnswer,
        point,
        currentAnswer
      }}
    >
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/question" element={<TestContainer />} />
        <Route path="/submit" element={<SubmitScreen />} />
        <Route path="/score" element={<ScoreScreen />} />
      </Routes>
    </Context.Provider>
  );
};

export default Navigation;
