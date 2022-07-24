import React from 'react'
import { useNavigate } from 'react-router-dom';

function ScoreScreen() {
    let navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div>
        <div className="text-[30px] text-center py-[30px]">Your score is ...</div>
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