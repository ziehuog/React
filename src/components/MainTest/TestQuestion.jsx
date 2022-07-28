import React, { useContext } from "react";
import { DATA } from "../../utils/data";
import { Context } from "../Share/Context";

const TestQuestion = () => {
  const { index, currentAnswer, handleAnswer } = useContext(Context);

  return (
    <div>
      <div className="pt-9 px-6">
        <div key={DATA[index].id}>
          
            {/* question */}
          <div className="text-center text-[35px] font-thin">
            {DATA[index].question}
          </div>

            {/* multiple choice */}
          <div className="answers">
            {DATA[index].answers.map((answer) => (
              <label key={answer.id}>
                <div className="bg-indigo-700/40 rounded-[10px] my-[15px] py-2 text-start px-[10px]">
                  <input
                    type="radio"
                    name={DATA[index].id}
                    checked={currentAnswer === answer.id}
                    className="mx-3"
                    value={answer.id}
                    onChange={handleAnswer(DATA[index].id)}
                  />
                  {answer.answer}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestQuestion;
