import React, { useContext, useState } from "react";
import { Auth } from "../Share/Context/Context";
import { dataContext } from "../Share/Context/DataContext";
import { utils as XLSXUtils, writeFile } from "xlsx";

function ShowResult() {
  const { authUsername } = useContext(Auth);
  const { dataResult, arraySubjects } = useContext(dataContext);
  const [subject, setSubject] = useState([]);


  //function export data to excel
  const exportToExcel = (fileName, data) => {
    console.log(data);
    const ws = XLSXUtils.json_to_sheet(data);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, fileName);
    writeFile(wb, `${fileName}.xlsx`);
  };

  //filter data using subject
  const storeData = dataResult.filter(
    (item) =>
      item.subject === subject && item.username === JSON.parse(authUsername)
  );

  return (
    <div>
      <span>
        {arraySubjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => {
              setSubject(subject.data.subject);
            }}
            className="border transition duration-300 cursor-pointer px-4 py-2 
             bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
              my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3
              focus:outline-none focus:ring focus:ring-violet-300 focus:text-white"
          >
            {subject.data.subject}
          </button>
        ))}
      </span>

      {storeData.length === 0 ? (
        <div>You haven't done the test yet...</div>
      ) : (
        <div>
          <button
            onClick={() => exportToExcel(`${subject}`, storeData)}
            className="border px-1 rounded-md"
          >
            Export to Excel
          </button>
          <div className="flex justify-center py-[50px]">
            <table className=" w-3/4 border border-slate-400">
              <thead className="h-4">
                <tr className="border-b-2 bg-indigo-100 text-center">
                  <th>Turn</th>
                  <th>Subject</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {storeData?.map((result, index) => (
                  <tr
                    key={index}
                    className="border-b-[1px] text-center border-slate-400 py-2"
                  >
                    <td>{index + 1}</td>
                    <td>{result.subject}</td>
                    <td>{result.score}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowResult;
