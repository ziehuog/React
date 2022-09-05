import React, { useContext, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { dataContext } from "../Share/Context/DataContext";
import ModalAddSubject from "../Share/Modals/ModalAddSubject";
import ModalSubject from "../Share/Modals/ModalSubject";

const UserAddData = () => {
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  const [SubjectId, setSubjectId] = useState("");
  const { setSubject, arraySubjects } = useContext(dataContext);
  

  return (
    <div>
      <div className="text-center">Choose one subject to add question! </div>
      <div className="flex justify-center grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 gap-3">
        {arraySubjects.map((subject, index) => (
          <div key={index} className="col-span-1 w-full">
            <button
              onClick={() => {
                setShowSubject(true);
                setSubject(subject.data.subject);
                setSubjectId(subject.id);
              }}
              value={subject.data.subject}
              className="border transition duration-300 cursor-pointer w-full py-2 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3 "
            >
              {subject.data.subject}
            </button>
          </div>
        ))}
        <button
          onClick={() => setShowAddSubject(true)}
          className="border transition duration-300 cursor-pointer flex justify-center
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
              items-center my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3"
        >
          <GrAdd />
        </button>
      </div>

     

      <ModalSubject
        show={showSubject}
        id={SubjectId}
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
