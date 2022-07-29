import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DATA } from "../utils/data";
import { User } from "./Auth/User";
import { Auth, Context } from "./Share/Context";

function ScoreScreen() {
  const {setBtnStart } = useContext(Auth);
  const { point,answerKey } = useContext(Context);

  let navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/home");
    setBtnStart(true)
    // window.location.reload();

  };
  return (
    <div>
      <User/>

      
      <div className="h-full bg-gradient-to-b from-indigo-500 flex  justify-center pt-[100px]">
      <div className="bg-gray-200/80  p-[40px]  rounded-2xl mt-[40px] h-min">
      <div className="text-[30px] text-center pb-[30px]">
        Your score is
        <span className="text-red-600 text-[35px]"> {point}</span>
      </div>
      <div>Correct answers:</div>

      {/* map to display question */}
      <div className="border border-gray-900 p-[40px] rounded-2xl m-auto p-auto mb-[50px] ">
        {DATA.map((data) => {
          return (
            <div key={data.id} className="my-3 ">
              <div className="my-3 "> question: {data.id}</div>

              {/* Map to display answers */}
              {data.answers.map((elems) => {
                return (
                  <label key={elems.id}>
                    <span className="bg-slate-400 rounded-[10px] m-[15px] py-2 text-start px-[10px]">
                      <input
                        type="checkbox"
                        name={elems.id}
                        // preview checked
                        defaultChecked={
                          
                          DATA.some((a) => {
                            if (a.id === data.id && a.correctAnswer === elems.id) {
                              return true;
                            }
                            return false;
                          })
                        }
                        className="mx-3"
                        value={elems.id}
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
          onClick={navigateToHome}
        >
          Back
        </button>
     
      </div>
    </div>
      
    </div>
  );
}

export default ScoreScreen;
