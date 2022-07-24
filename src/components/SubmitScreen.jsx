import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DATA } from "../utils/data";


const SubmitScreen = () => {
  let navigate = useNavigate();
  let [index, setIndex] = useState(0)
  

  const navigateToTest = () => {
    navigate("/question");
  };

  const navigateToScore = () => {
    navigate("/score");
  };
 
  console.log(DATA[index])
  let answerPreview = []

  return (
    <div>
      <div>
        <div>Cau: {index +1 }</div>
      {DATA[index].answers.map((answer)=> (
        <div key={answer.id}>
          {answer.id}
        </div>
        
      ))}
      </div>
      <div className="text-[30px] text-center py-[30px]">Are you finished?</div>
      <div className="text-center">
        <button
          className="text-[24px] border rounded-[8px] cursor-pointer py-1 px-9 mx-5 hover:bg-slate-600 hover:text-white"
          onClick={navigateToTest}
        >
          Back
        </button>
        <button
          className="text-[24px] border rounded-[8px] cursor-pointer py-1 px-8 mx-5 hover:bg-slate-600 hover:text-white"
          onClick={navigateToScore}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SubmitScreen;
