import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../Share/DataContext";
import { GrAdd } from "react-icons/gr";
import ModalAddSubject from "../Data/ModalAddSubject";
import ModalSubject from "../Data/ModalSubject";
import { useState } from "react";

const UserAddData = () => {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  const {setSubject, arraySubjects} = useContext(dataContext);

  return (
    <div>
      <div className="text-center">Choose one subject to add question! </div>
      <div className="flex justify-center">
        {
        arraySubjects.map((subject, index) => (
          
          <div key={index}> 
            <button
          onClick={() => {
            setShowSubject(true)
            setSubject(subject)
          }
          }
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
          onClick={() => setShowAddSubject(true)}
          className="border transition duration-300 cursor-pointer px-4 py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          <GrAdd/>
        </button>
      </div>
      <ModalSubject
      show={showSubject}
      onHide={() => setShowSubject(false)}
      />
      <ModalAddSubject
      show={showAddSubject}
      onHide={() => setShowAddSubject(false)}
      />
    </div>
  );
};

export default UserAddData;
