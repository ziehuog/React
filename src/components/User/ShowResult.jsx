import React, { useContext } from "react";
import { Auth } from "../Share/Context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { dataContext } from "../Share/Context/DataContext";

function ShowResult() {
  const { authUsername } = useContext(Auth);
  const { dataResult, arraySubjects } = useContext(dataContext);

  const [score, setScore] = useState([]);
  
  


  const storeData = dataResult.filter(
    (items) =>
      items.subject === score && items.username === JSON.parse(authUsername)
  );

  return (
    <div>
      <div>
        {arraySubjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => setScore(subject.data.subject)}
            className="border transition duration-300 cursor-pointer px-4 py-2 
             bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
              my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3
              focus:outline-none focus:ring focus:ring-violet-300 focus:text-white"
          >
            {subject.data.subject}
          </button>
        ))}
      </div>
      {storeData.length === 0 ? (
        <div>You haven't done the test yet...</div>
      ) : (
        <div className="flex justify-center py-[50px]">
          <table className="w-8/12">
            <thead className="border">
              <tr>
                <th className="border-2 border-black text-center">Turn</th>
                <th className="border-2 border-black text-center">Subject</th>
                <th className="border-2 border-black text-center">Score</th>
              </tr>
            </thead>
            <tbody className="border-y-2 border-black">
              {storeData?.map((result, index) => (
                <tr key={index} className="border">
                  <td className="border-x-2 border-black text-center">
                    {index + 1}
                  </td>
                  <td className="border-x-2 border-black text-center">
                    {result.subject}
                  </td>
                  <td className="border-x-2 border-black text-center">
                    {result.score}/10
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ShowResult;
