import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import AddData from "./Data/AddData";
import TestContainer from "./MainTest/TestContainer";
import ScoreScreen from "./ScoreScreen";
import { ANSWER, SETDATA } from "./Share/Constants";
import { Auth, questionContext } from "./Share/Context";
import { dataReducer, initState } from "./Share/Reducer";
import SubmitScreen from "./SubmitScreen";
import NavUser from "./User/NavUser";

const Navigation = () => {
  const navigate = useNavigate();
  const { authUsername, setBtnStart } = useContext(Auth);

  const [state, dispatch] = useReducer(dataReducer, initState);
  const { data, storeAns } = state;

  useEffect(() => {
    const getData = async () => {
      const questionData = await getDocs(collection(db, "Questions"));
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

    const querySnapshot = await getDocs(collection(db, "Result"));
    querySnapshot.forEach((doc) => {
      const aUser = doc.data();
      if (aUser.username === JSON.parse(authUsername)) {
        count++;
      }
    });
    if (count < 5) {
      try {
        addDoc(collection(db, "Result"), {
          username: JSON.parse(authUsername),
          score: point,
        });
        navigate("/test/score");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      window.alert(
        "You have done this test 5 times before so your result cannot save!",

        navigate("/")
      );
      setBtnStart(true);

    }
  };

  return (
    <div>
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
            <Route path="/question" element={<TestContainer />} />
            <Route path="/submit" element={<SubmitScreen />} />
            <Route path="/score" element={<ScoreScreen />} />
            <Route path="user/*" element={<NavUser />} />
            <Route path="add-data" element={<AddData />} />
            {/* <Route path="add-data" element={<AddData />} /> */}
          </Routes>
        </questionContext.Provider>
      )}
    </div>
  );
};

export default Navigation;
