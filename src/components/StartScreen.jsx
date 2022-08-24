import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { classByCondition } from "./Share/classByCondition";
import { Auth, questionContext } from "./Share/Context/Auth";
import { dataContext } from "./Share/Context/DataContext";

const StartScreen = () => {
  let navigate = useNavigate();
  // const { btnStart } = useContext(questionContext);
  const {subject, setSubject, arraySubjects } = useContext(dataContext);

  return (
    <Fragment>
      <div className="pt-[150px] h-[100vh]">
        <div className="text-[30px] text-center py-[30px]">
          Choose a subject to start the test!
        </div>

        <div className="flex justify-center">
          {arraySubjects.map((subject, index) => (
            <div key={index}>
              <button
                className={
                  "border transition duration-300 rounded-xl cursor-pointer px-4 py-2 bg-indigo-300 hover:bg-indigo-600 hover:text-white mx-3"
                // + classByCondition("cursor-not-allowed", btnStart)
                }
                onClick={() => {
                  setSubject(subject.data.subject);
                  navigate(`/question/${subject.data.subject}`);
                }}
                // disabled={btnStart}
              >
                {subject.data.subject}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default StartScreen;
