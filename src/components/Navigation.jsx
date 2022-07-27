import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { DATA } from "../utils/data";
import { Context } from "./Context";
import ScoreScreen from "./ScoreScreen";
import SubmitScreen from "./SubmitScreen";
import TestContainer from "./TestContainer";

const Navigation = () => {
  const [index, setIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [nextButton, setNextButton] = useState(false);
  const [displayNext, setDisplayNext] = useState("block");
  const [displaySubmit, setDisplaySubmit] = useState("none");
  const [remaining, setRemaining] = useState(1000 * 60*50);
  const [timeOver, setTimeOver] = useState("");

  const navigate = useNavigate();
  const refAnswer = useRef([]);

  let score = 0;

  
  const navigateToScore = () => {
    navigate("/score");
  };
  
  //Countdown

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemaining(remaining - 1000);
    }, 1000);

    if (remaining <= 10000) {
      setTimeOver("text-red-600");
      console.log("warning");
    }

    if (remaining <= 0) {
      clearInterval(timerId);
      navigateToScore();
    }

    return () => {
      clearInterval(timerId);
    };
  }, [remaining]);

  //Answer
  const handleAnswer = (id) => (e) => {
    const value = e.target.value;
    setCurrentAnswer(value);
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

  // Score
  for (let i = 0; i < DATA.length; i++) {
    for (let j = 0; j < answerKey.length; j++) {
      if (
        DATA[i].id === answerKey[j].id &&
        DATA[i].correctAnswer === answerKey[j].answer
      ) {
        ++ score;
      }
    }
  }

  let point = Math.round((score / DATA.length) * 10);

  //Button Submit
  const buttonSubmit = () => {
    if (index >= DATA.length - 1) {
      setIndex(DATA.length - 1);
      navigateToSubmit();
    } else if (index === DATA.length - 2) {
    }
  };

  //Button Next

  const buttonNext = () => {
    setNextButton(false);
    setIndex(index + 1);
    setDisplayNext("block");

    if (index >= DATA.length - 1) {
      setIndex(DATA.length - 1);

      setNextButton(true);
    } else if (index === DATA.length - 2) {
      setDisplaySubmit("block");
      setDisplayNext("none");
    }

    //save previous choose
    const nextQuestion = DATA[index + 1];
    const aIndex = refAnswer.current.findIndex((a) => {
      if (nextQuestion.id === a.id) return true;
    });

    if (aIndex !== -1) {
      setCurrentAnswer(refAnswer.current[aIndex].answer);
    } else {
      setCurrentAnswer(null);
    }

    //
  };

  //Button Back
  const buttonBack = () => {
    setNextButton(false);
    setIndex(index - 1);
    setDisplayNext("block");
    setDisplaySubmit("none");

    if (index <= 0) {
      setIndex(0);
    }

    //save previous answer

    const prevQuestion = DATA[index - 1];
    const pIndex = refAnswer.current.findIndex((a) => {
      if (prevQuestion.id === a.id) return true;
    });

    if (pIndex !== -1) {
      setCurrentAnswer(refAnswer.current[pIndex].answer);
    } else {
      setCurrentAnswer(null);
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
        currentAnswer,
        buttonSubmit,
        answerKey,
        displayNext,
        displaySubmit,
        remaining,
        setRemaining,
        timeOver,
        setTimeOver,
        navigateToScore,
      }}
    >
      <Routes>
          <Route path="/question" element={<TestContainer />} />
          <Route path="/submit" element={<SubmitScreen />} />
          <Route path="/score" element={<ScoreScreen />} />
      </Routes>
    </Context.Provider>
  );
};

export default Navigation;
