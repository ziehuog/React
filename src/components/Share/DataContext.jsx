import { createContext, useState } from "react";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [subject, setSubject] = useState("Questions");
  const [arrayResult, setArrayresult] = useState([]);

  return (
    <dataContext.Provider
      value={{
        arrayResult,
        setArrayresult,
        subject,
        setSubject,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
