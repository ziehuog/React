import React, { useContext, useState } from "react";
import { Auth } from "../Share/Context";
import { dataContext } from "../Share/Context/DataContext";
import { utils as XLSXUtils, writeFile } from "xlsx";

function ShowResult() {
  const { authUsername } = useContext(Auth);
  const { dataResult, arraySubjects } = useContext(dataContext);
const [showAll, setShowAll] = useState('none')
  const [subject, setSubject] = useState([]);

//function export data to excel
  const exportToExcel = (fileName, data) => {
    console.log(data)
    const ws = XLSXUtils.json_to_sheet(data);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, fileName);
    writeFile(wb, `${fileName}.xlsx`);
  };

  console.log(arraySubjects)

  // const allData = dataResult.filter(item => item.username === JSON.parse(authUsername)  )
  const storeData = dataResult.filter(
    (item) =>
      item.subject === subject && item.username === JSON.parse(authUsername)
  );

  return (
    <div>
      <span>
        <button
          onClick={() => setShowAll('block')}
          className="border transition duration-300 cursor-pointer px-4 py-2 
             bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
              my-[20px] rounded-md hover:bg-sky-700  hover:text-white mx-3
              focus:outline-none focus:ring focus:ring-violet-300 focus:text-white" 
        >
          All
        </button>
      </span>
      <span>
        {arraySubjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => {
              setSubject(subject.data.subject)
              setShowAll('none')
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

      {/* / */}
      <div className="flex justify-center py-[50px]" style={{display: `${showAll}`}}>
            <table className="w-8/12">
              <thead className="border">
                <tr>
                  <th className="border-2 border-black text-center">Turn</th>
                  <th className="border-2 border-black text-center">Subject</th>
                  <th className="border-2 border-black text-center">Score</th>
                </tr>
              </thead>
              <tbody className="border-y-2 border-black">
                {dataResult?.map((result, index) => (
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

          {/* / */}
      {storeData.length === 0 ? (
        <div>
          You haven't done the test yet...
          </div>
      ) : (
        <div>
          <button
            onClick={()=>exportToExcel(`${subject}`, storeData)}
            className="border px-1 rounded-md"
          >
            Export to Excel
          </button>
          <div className="flex justify-center py-[50px]">
            <table className="table-auto w-3/4 border-spacing-2 border border-slate-400">
              <thead >
                <tr className="border-b-2 border-black py-2">
                  <th>Turn</th>
                  <th >Subject</th>
                  <th >Score</th>
                </tr>
              </thead>
              <tbody >
                {storeData?.map((result, index) => (
                  <tr key={index} className="border-b-[1px] border-slate-400 py-2">
                    <td >
                      {index + 1}
                    </td>
                    <td >
                      {result.subject}
                    </td>
                    <td >
                      {result.score}/10
                    </td>
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
