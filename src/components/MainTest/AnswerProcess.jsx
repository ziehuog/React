import React, { useContext } from "react";
import { questionContext } from "../Share/Context/Auth";
import { dataContext } from "../Share/Context/DataContext";

const AnswerProcess = () => {
  const { state } = useContext(questionContext);
  const { index, data } = state;
  const { subject } = useContext(dataContext);

  let percentage = data.length;

  return (
    <div className="p-[40px] border-b-[2px]">
      <h1 className="font-bold text-[50px] pb-6">{subject} Quiz</h1>

      <div>
        Question Number: {index + 1} / {percentage}
      </div>
    </div>
  );
};

export default AnswerProcess;
