import React, { Fragment, useEffect} from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Auth/Navbar";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ANSWER, SETDATA } from "./Share/Constants";
import { useReducer } from "react";
import { dataReducer, initState } from "./Share/Reducer";
import { useContext } from "react";
import { useState } from "react";
import { dataContext } from "./Share/Context/DataContext";
import { Auth } from "./Share/Context/Auth";
import { questionContext } from "./Share/Context/QuestionContext";

const Navigation = () => {
  const {currentSubject} = useParams()
  // const [state, dispatch] = useReducer(dataReducer, initState);
  // const { data, storeAns } = state;
  const navigate = useNavigate();
  const [btnStart, setBtnStart] = useState(false);

  const { subject } = useContext(dataContext);
  const { authUsername, setToken, setAuthUsername } = useContext(Auth);
  const [state, dispatch] = useReducer(dataReducer, initState);
  const { data, storeAns } = state;



  //answer
  const handleAnswer = (id) => (e) => {
    const value = e.target.value;
    dispatch({
      type: ANSWER,
      data: {
        id,
        answer: value,
      },
    });
  };

  //calculate score
  let score = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < storeAns.length; j++) {
      if (
        data[i].id === storeAns[j].id &&
        data[i].correctAnswer === storeAns[j].answer
      ) {
        ++score;
      }
    }
  }
  let point = Math.round((score / data.length) * 10);

  //check result if (result < 5) => store in data
  const navigateToScore = async () => {
    let count = 0;

    const querySnapshot = await getDocs(collection(db, "Results"));
    querySnapshot.forEach((doc) => {
      const result = doc.data();
      if (
        result.username === JSON.parse(authUsername) &&
        result.subject === subject
      ) {
        count++;
      }
    });
    if (count < 5) {
      try {
        addDoc(collection(db, "Results"), {
          username: JSON.parse(authUsername),
          score: point,
          subject: subject,
        });
        navigate(`/score/${currentSubject}`);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      window.alert(
        "You have done this test 5 times before so your result cannot save!",
        navigate("/start")
      );
      setBtnStart(true);
    }
  };

  const Logout = () => {
    let result = window.confirm(
      "Do you want to log out? your test will stop and it will not save"
    );

    // delete all in local storage when click logout
    if (result) {
      setToken(localStorage.removeItem("id"));
      setAuthUsername(localStorage.removeItem("username"));
      navigate("/login");
      window.location.reload();
    }
  };

  useEffect(() => {
    const getData = async () => {
      const questionData = await getDocs(collection(db, `${currentSubject}`));
      dispatch({
        type: SETDATA,
        data: questionData.docs
          .map((doc) => doc.data())
          .sort((a, b) => a.id - b.id),
      });
    };
    getData();
  }, [currentSubject]);
  return (
    <Fragment>
       <questionContext.Provider
    value={{
      state,
      dispatch,
      handleAnswer,
      point,
      navigateToScore,
      btnStart,
      data,
      currentSubject
    }}>
      <Navbar/>
      <Outlet/>
      </questionContext.Provider>
    </Fragment>
  );
};

export default Navigation;
