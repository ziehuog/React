import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Auth/Navbar";
import { Auth } from "./Share/Context";

const StartScreen = () => {
  let navigate = useNavigate();
  const { btnStart } = useContext(Auth);

  return (
    <Fragment>
      <Navbar />
      <div className="pt-[150px] h-[100vh] bg-gradient-to-b from-indigo-500">
        <div className="text-[30px] text-center py-[30px]">
          Click <b>Start</b> to start the test!
        </div>

        <div className="text-center">
          <button
            
            className="text-[24px] border rounded-[8px] cursor-pointer py-1 px-8 hover:bg-gray-700/30 hover:text-white"
            onClick={() => {navigate("test/question")}}
            disabled = {btnStart}
          >
            {/* <Link to = '/question' refresh ='true'></Link> */}
            Start
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default StartScreen;
