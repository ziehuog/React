import React from "react";
import { Navbar, User } from "../Auth/Navbar";
import { TimerProvider } from "../Share/TimerContext";
import AnswerProcess from "./AnswerProcess";
import LayoutBottom from "./LayoutBottom";
import TestQuestion from "./TestQuestion";
import Timer from "./Timer";

const TestContainer = () => {
  return (
    <TimerProvider>
      {/* <Navbar /> */}
      <div className="App bg-gradient-to-b from-indigo-500 py-[70px] w-[100vw] h-full">
        <div className="bg-gray-100/80 rounded-[20px] drop-shadow-xl w-[65vw] m-auto ">
          <Timer />
          <AnswerProcess />
          <TestQuestion />
          <LayoutBottom />
        </div>
      </div>
    </TimerProvider>
  );
};

export default TestContainer;
