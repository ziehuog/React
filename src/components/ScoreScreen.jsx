import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { questionContext } from "./Share/Context/QuestionContext";

function ScoreScreen() {
  const { state, point } = useContext(questionContext);
  const { data } = state;
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center pt-[100px]">
        <div className="bg-gray-200/80  p-[40px]  rounded-2xl mt-[40px] h-min">
          <div className="text-[30px] text-center pb-[30px]">
            Your score is
            <span className="text-red-600 text-[35px]"> {point}</span>
          </div>
          <div>Correct answers:</div>

          {/* map to display question */}
          <div className="border border-gray-900 p-[40px] rounded-2xl m-auto p-auto mb-[50px] ">
            {data.map((dt) => {
              return (
                <div key={dt.id} className="my-3 ">
                  <div className="my-3 "> question: {dt.id}</div>

                  {/* Map to display answers */}
                  {dt.answers.map((elems) => {
                    return (
                      <label key={elems.id}>
                        <span className="bg-slate-400 rounded-[10px] m-[15px] py-2 text-start px-[10px]">
                          <input
                            type="checkbox"
                            name={elems.id}
                            // preview checked
                            checked={data.some((a) => {
                              if (
                                a.id === dt.id &&
                                a.correctAnswer === elems.id
                              ) {
                                return true;
                              }
                              return false;
                            })}
                            className="mx-3"
                          />
                          {elems.id}
                        </span>
                      </label>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <button
            className=" border border-gray-900 rounded-[8px] cursor-pointer py-1 px-9 mx-5 py-[7px] hover:bg-indigo-600/60 hover:text-white"
            onClick={() => {
              navigate("/start");
              window.location.reload();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreScreen;
