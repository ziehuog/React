import { createContext, useState } from "react";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [subject, setSubject] = useState("Questions");
  const [arraySubjects, setArraySubjects] = useState(["Maths", "Questions"]);

  return (
    <dataContext.Provider
      value={{
        arraySubjects,
        setArraySubjects,
        subject,
        setSubject,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
