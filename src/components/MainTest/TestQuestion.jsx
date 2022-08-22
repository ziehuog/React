import React, { useContext } from "react";
import { questionContext } from "../Share/Context/Context";

const TestQuestion = () => {
  const { state, handleAnswer } = useContext(questionContext);
  const { index, data, storeAns} = state;

  return (
    <div>
      <div className="pt-9 px-6 w-full">
        {data.length === 0 ? (
          <div className="lds-dual-ring"></div>
        ) : (
          data.length > 0 && (
            <div key={data[index].id} className='w-full'>
              <div className="text-center w-full text-[30px] font-thin font-serif">
                {data[index].question}
              </div>

              <div className="answers w-full">
                {data[index].answers.map((answer) => (
                  <label key={answer.id} className="w-full">
                    <div className="bg-indigo-700/40 w-full rounded-[10px] my-[15px] py-2 text-start px-[10px]">
                      <input
                        type="radio"
                        name={data[index].id}
                        checked={storeAns[index]?.answer === answer.id}
                        className="mx-3 "
                        value={answer.id}
                        onChange={handleAnswer(data[index].id)}
                      />
                      {answer.answer}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TestQuestion;
