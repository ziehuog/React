import React, { useContext } from "react";
import { Auth } from "../Share/Context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useState } from "react";
import { useEffect } from "react";

function ShowResult() {
  const { authUsername } = useContext(Auth);
  const userScore = [];

  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const questionData = await getDocs(collection(db, "Result"));
      questionData.forEach((doc) => {
        setDataResult((data) => {
          return [...data, doc.data()];
        });
      });
    };
    getData();
  }, []);

  dataResult.map((user) => {
    if (user.username === JSON.parse(authUsername)) {
      userScore.push(user);
    }
  });

  return (
    <div>
      {userScore.length === 0 ? (
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
                {userScore.map((result, index) => (
                  <tr key={index} className="border">
                    <td className="border-x-2 border-black text-center">{index + 1}</td>
                    <td className="border-x-2 border-black text-center">Subject</td>
                    <td className="border-x-2 border-black text-center">{result.score}/10</td>
                    {/* <p>
                    
                      Turn {index + 1}: {result.score}/10
                    </p> */}
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
