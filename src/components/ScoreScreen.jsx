import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from './Context';

function ScoreScreen() {

  const {point} = useContext(Context)

    let navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
    window.location.reload();

  };
  return (
    <div>
        <div className="text-[30px] text-center py-[30px]">Your score is 
          <span className="text-red-600 text-[35px]"> {point}</span>  
        </div>
        <div className="text-center">
        <button
          className="text-[24px] border rounded-[8px] cursor-pointer py-1 px-8 hover:bg-slate-600 hover:text-white"
          onClick={navigateToHome}
        >
          Back to home
        </button>
      </div>
    </div>
  )
}

export default ScoreScreen