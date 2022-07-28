import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./Auth/User";
import { Auth, Context } from "./Share/Context";

function ScoreScreen() {
  const { token, setToken } = useContext(Auth);
  const { point } = useContext(Context);

  let navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/home");
    
    
    // console.log(token)
    window.location.reload();
  };
  return (
    <div>
      <User/>

      <div className="text-[30px] text-center py-[100px]">
        Your score is
        <span className="text-red-600 text-[35px]"> {point}</span>
      </div>
      {/* <div className="text-center">
        <button
          className="text-[24px] border rounded-[8px] cursor-pointer py-1 px-8 bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200 hover:text-white"
          onClick={navigateToHome}
        >
          Back to home
        </button>
      </div> */}
    </div>
  );
}

export default ScoreScreen;
