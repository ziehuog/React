import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Share/Context";
import { dataContext } from "../Share/DataContext";
import { GrAdd } from "react-icons/gr";

const UserAddData = () => {
  const navigate = useNavigate();
  const { authUsername } = useContext(Auth);
  const { subject, setSubject, arraySubjects, setArraySubjects } = useContext(dataContext);


  return (
    <div>
      <div className="text-center">Choose one subject to add question! </div>
      <div className="flex justify-center">
        {
        arraySubjects.map((subject, index) => (
          
          <div key={index}> 
            <button
          onClick={() => {
            navigate("/test/add-data");
            setSubject(subject);
          }}
          value={subject}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          {subject}
        </button>
          </div>
        ))
        }
        <button
          onClick={() => {
            navigate("/test/add-data");
            setSubject("Physics");
          }}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          <GrAdd/>
        </button>
      </div>
    </div>
  );
};

export default UserAddData;
