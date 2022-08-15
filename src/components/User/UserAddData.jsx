import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Share/Context";

const UserAddData = () => {
  const navigate = useNavigate();
  const { authUsername } = useContext(Auth);

  if (authUsername === "admin") {
  }

  return (
    <div>
        <div className="text-center">Choose one subject to add question! </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/test/add-data")}
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

export default UserAddData;
