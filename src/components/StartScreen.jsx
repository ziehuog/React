import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "./Share/Context/Context";
import { dataContext } from "./Share/Context/DataContext";

const StartScreen = () => {
  let navigate = useNavigate();
  const { btnStart } = useContext(Auth);
  const {  setSubject, arraySubjects } = useContext(dataContext);

  return (
    <Fragment>
      <div className="pt-[150px] h-[100vh]">
        <div className="text-[30px] text-center py-[30px]">
          Click <b>Start</b> to start the test!
        </div>

        <div className="flex justify-center">
          {arraySubjects.map((subject, index) =>(
            <div key={index}>
              <button
              className="border transition duration-300 rounded-xl cursor-pointer px-4 py-2 
             bg-indigo-300 hover:bg-indigo-600 hover:text-white mx-3"
              onClick={() => {
                navigate("/question");
                setSubject(subject.data.subject);
              }}
              disabled={btnStart}
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
