import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { Fragment, useContext, useEffect, useReducer } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import AddData from "./Data/AddData";
import TestContainer from "./MainTest/TestContainer";
import ScoreScreen from "./ScoreScreen";
import { ANSWER, SETDATA } from "./Share/Constants";
import { Auth, questionContext } from "./Share/Context/Context";
import { dataContext } from "./Share/Context/DataContext";
import { dataReducer, initState } from "./Share/Reducer";
import StartScreen from "./StartScreen";
import SubmitScreen from "./SubmitScreen";
import NavUser from "./User/NavUser";
import logo from "../asset/img/ziehuog-logo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const { authUsername, setBtnStart, setToken, setAuthUsername } =
    useContext(Auth);
  const { subject } = useContext(dataContext);

  const [state, dispatch] = useReducer(dataReducer, initState);
  const { data, storeAns } = state;

  useEffect(() => {
    const getData = async () => {
      const questionData = await getDocs(collection(db, `${subject}`));
      dispatch({
        type: SETDATA,
        data: questionData.docs
          .map((doc) => doc.data())
          .sort((a, b) => a.id - b.id),
      });
    };
    getData();
  }, []);

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

  //store result
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
        navigate("/score");
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

  return (
    <Fragment>
      <div
        className="flex justify-between px-6 h-[55px] items-center bg-white 
    z-[100] fixed w-full border-b-2 border-indigo-700"
      >
        <div>
          <Link to="/start">
            <img className="h-[45px] cursor-pointer" src={logo} />
          </Link>
        </div>
        <div className="border border-indigo-600 px-4 py-[3px] rounded-2xl cursor-pointer">
          <Link to="/user/">Username: {JSON.parse(authUsername)}</Link>
        </div>
        <button
          className="bg-gradient-to-b from-indigo-500  to-indigo-300 px-4 py-2 rounded-2xl"
          onClick={Logout}
        >
          Log out
        </button>
      </div>

      {!data ? (
        <div class="lds-dual-ring"></div>
      ) : (
        <questionContext.Provider
          value={{
            state,
            dispatch,
            handleAnswer,
            point,
            navigateToScore,
          }}
        >
            <Routes>
              <Route path="/start" element={<StartScreen />} />
              <Route path="/question" element={<TestContainer />} />
              <Route path="/submit" element={<SubmitScreen />} />
              <Route path="/score" element={<ScoreScreen />} />
              <Route path="user/*" element={<NavUser />} />
            </Routes>
        </questionContext.Provider>
      )}
    </Fragment>
  );
};

export default Navigation;
