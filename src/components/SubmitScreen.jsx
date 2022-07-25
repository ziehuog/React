import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DATA } from "../utils/data";
import { Context } from "./Context";

const SubmitScreen = () => {
  const { handleAnswer } = useContext(Context);

  let navigate = useNavigate();
  // let [index, setIndex] = useState(0)

  const navigateToTest = () => {
    navigate("/question");
  };

  const navigateToScore = () => {
    navigate("/score");
  };

  // console.log(DATA[index])
  // let answerPreview = []

  return (
    <div>
      <div className="text-[30px] text-center py-[30px]">Are you finished?</div>
      {DATA.map((data) => {
        return (
          <Fragment key={data.id}>
            <div > Cau: {data.id}</div>
            {data.answers.map((elems) => {
              return <div key={elems.id}>{elems.id}</div>;
            })}
          </Fragment>
        );
      })}
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
