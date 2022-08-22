import React from "react";
import { TimerProvider } from "../Share/Context/TimerContext";
import AnswerProcess from "./AnswerProcess";
import LayoutBottom from "./LayoutBottom";
import TestQuestion from "./TestQuestion";
import Timer from "./Timer";

const TestContainer = () => {
  return (
    <TimerProvider>
      <div className="py-[100px] text-center">
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
