import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Auth } from "../components/Share/Context";
import { DATA } from "../utils/data";
import { db } from "../utils/firebase";
import TestContainer from "./MainTest/TestContainer";
import ScoreScreen from "./ScoreScreen";
import { Context } from "./Share/Context";
import SubmitScreen from "./SubmitScreen";

const Navigation = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [remaining, setRemaining] = useState(1000 * 60 * 10);
  const [timeOver, setTimeOver] = useState("");

  const [nextButton, setNextButton] = useState(false);
  const [displayNext, setDisplayNext] = useState("block");
  const [displayBack, setDisplayBack] = useState("hidden");
  const [displaySubmit, setDisplaySubmit] = useState("none");

  const { authUsername } = useContext(Auth);

  const navigate = useNavigate();
  const refAnswer = useRef([]);

  let score = 0;

  useEffect(() => {
    const getData = async () => {
      const questionData = await getDocs(collection(db, "Questions"));
      setData(
        questionData.docs.map((doc) => doc.data()).sort((a, b) => a.id - b.id)
      );
    };
    getData();
  }, []);

  //Countdown

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemaining(remaining - 1000);
    }, 1000);

    if (remaining <= 10000) {
      setTimeOver("text-red-600");
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
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < answerKey.length; j++) {
      if (
        data[i].id === answerKey[j].id &&
        data[i].correctAnswer === answerKey[j].answer
      ) {
        ++score;
      }
    }
  }

  let point = Math.round((score / data.length) * 10);

  //store result

  const navigateToScore = async () => {
    let flag = true;

    const querySnapshot = await getDocs(collection(db, "Result"));
    querySnapshot.forEach((doc) => {
      const aUser = doc.data();
      if (aUser.username === JSON.parse(authUsername)) {
        flag = false;
      }
    });
    if (flag) {
      try {
        addDoc(collection(db, "Result"), {
          username: JSON.parse(authUsername),
          score: point,
        });
        navigate("/score");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      window.alert(
        "You have done this test before so your result cannot save!",
        navigate("/home")
      );
    }
  };

  //Button Submit
  const buttonSubmit = () => {
    if (index >= data.length - 1) {
      setIndex(data.length - 1);
      setDisplayBack("block");

      navigateToSubmit();
    }
  };

  //Button Next

  const buttonNext = () => {
    setNextButton(false);
    setIndex(index + 1);
    setDisplayBack("visible");
    setDisplayNext("block");

    if (index >= data.length - 1) {
      setIndex(data.length - 1);
      setDisplayBack("visible");

      setNextButton(true);
    } else if (index === data.length - 2) {
      setDisplaySubmit("block");
      setDisplayNext("none");
      setDisplayBack("visible");
    }

    //save previous choose
    const nextQuestion = data[index + 1];
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
    setDisplayBack("block");

    if (index <= 0) {
      setIndex(0);
    }

    //save previous answer

    if (index === 1) {
      setDisplayBack("hidden");
    }

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
        timeOver,
        navigateToScore,
        displayBack,
        data,
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
