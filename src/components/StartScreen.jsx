import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Auth/Navbar";
import { Auth } from "./Share/Context";
import { dataContext } from "./Share/DataContext";

const StartScreen = () => {
  let navigate = useNavigate();
  const { btnStart } = useContext(Auth);
  const {  setSubject, arraySubjects } = useContext(dataContext);

  return (
    <Fragment>
      <Navbar />
      <div className="pt-[150px] h-[100vh] bg-gradient-to-b from-indigo-500">
        <div className="text-[30px] text-center py-[30px]">
          Click <b>Start</b> to start the test!
        </div>

        <div className="flex justify-center">
          {arraySubjects.map((subject, index) =>(
            <div key={index}>
              <button
              className="text-[20px] border rounded-[8px] cursor-pointer my-3 py-1 px-6 hover:bg-gray-700/30 hover:text-white"
              onClick={() => {
                navigate("test/question");
                setSubject(subject);
              }}
              disabled={btnStart}
            >
              {subject}
            </button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default StartScreen;
