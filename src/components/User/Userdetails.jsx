import React from "react";
import { useNavigate } from "react-router-dom";
const UserDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      {/* <div>This is User details</div> */}
      <div>
      <button
      onClick={() => navigate('/test/add-data')}
        className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
      >
        Add Question
      </button>
      </div>
    </div>
  );
};

export default UserDetails;
