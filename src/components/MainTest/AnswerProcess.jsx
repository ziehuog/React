import React, { useContext } from "react";
import { DATA } from "../../utils/data";
import { Context } from "../Share/Context";



const AnswerProcess = () => {
  const {index, data} = useContext(Context)



  let percentage = data.length
  
  const processColor = ((Number(index))/ (Number(percentage)))*200

  const showPercentage = Math.round(((Number(index))/ (Number(percentage))) * 100)

  return (
    <div className="p-[40px] border-b-[2px]">
      <h1 className="font-bold text-[50px] pb-6">Reactjs Quiz</h1>

      {/* <div className="w-[200px] h-[20px] bg-[#808080] rounded-[20px] m-auto my-6">
        <div className="h-full bg-indigo-500 rounded-[20px]" style={{width: `${processColor}px`}}></div>
      </div> */}
      <div>Question Number: {index+1} / {percentage}</div>
      {/* <div className="process__text">{showPercentage}% Completed</div> */}
    </div>
  );
};

export default AnswerProcess;
