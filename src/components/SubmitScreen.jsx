import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DATA } from "../utils/data";
import { Context } from "./Context";

const SubmitScreen = () => {
  const {  answerKey} = useContext(Context);
console.log(answerKey)

  let navigate = useNavigate();

  const navigateToTest = () => {
    navigate("/question");
  };

  const navigateToScore = () => {
    navigate("/score");
    
  };




  return (
    <div>
      <div className="text-[30px] text-center py-[30px]  ">Are you finished?</div>

      {/* map to display question */}
      <div className="border p-[40px] w-2/3 m-auto p-auto mb-[50px] ">
      {DATA.map((data) => {
        return (
          <div key={data.id} className="my-3 ">
            <div className="my-3 "> Câu: {data.id}</div>

          {/* Map to display answers */}
            {data.answers.map((elems) => {
              return <label key={elems.id}>
              <span className="bg-slate-400 rounded-[10px] m-[15px] py-2 text-start px-[10px]">
                <input
                  type="checkbox"
                  name={elems.id}

                  // preview checked
                  checked = { answerKey.length > 0 && answerKey.some((a) => { 
                    if(a.id === data.id && a.answer === elems.id){
                      return true
                    } 
                    return false
                  })}
                  className="mx-3"
                  value={elems.id}
                />
                {elems.id}
              </span>
            </label>;
            })}
          </div>
        );
      })}
      </div>
      <div className="text-center">
        <button
          className=" border rounded-[8px] cursor-pointer py-1 px-9 mx-5 hover:bg-slate-600 hover:text-white"
          onClick={navigateToTest}
        >
          Back
        </button>
        <button
          className=" border rounded-[8px] cursor-pointer py-1 px-8 mx-5 hover:bg-slate-600 hover:text-white"
          onClick={navigateToScore}
        >
          Submit
        </button>
        
      </div>
    </div>
  );
};

export default SubmitScreen;
