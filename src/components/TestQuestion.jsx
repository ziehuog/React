import React, { useState, useContext } from "react";
import { DATA } from "../utils/data";
import AnswerProcess from "./AnswerProcess";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { indexContext } from "./LayoutBottom";

// export const indexContext = createContext();

const TestQuestion = (index) => {
  // const [index, setIndex] = useState(0);
  // const [nextButton, setNextButton] = useState("Next");
  // const [hide, setHide] = useState('block')
  // let navigate = useNavigate();

  // const index = useContext(indexContext);
  // console.log("bhb");

  return (

      <div style={{ display: "hidden" }}>
        <div className="pt-9 px-6">
          <div key={DATA[index].id}>
            <div className="text-center text-[35px] font-thin">
              {DATA[index].question}
            </div>
            <div className="answers">
              {DATA[index].answers.map((a) => (
                <div
                  key={a.id}
                  className="bg-slate-400 rounded-[10px] my-[15px] py-2 text-start px-[10px]"
                >
                  <span className="">{a.answer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default TestQuestion;
