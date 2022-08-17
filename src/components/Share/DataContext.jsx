import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { db } from "../../utils/firebase";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [subject, setSubject] = useState("Questions");
  const [arraySubjects, setArraySubjects] = useState([]);
  const [dataResult, setDataResult] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  
//get subject data
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "Subjects"));
      querySnapshot.forEach((doc) => {
        setArraySubjects((prev) => [...prev, { data: doc.data(), id: doc.id }]);
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const questionData = await getDocs(collection(db, "Results"));
      questionData.forEach((doc) => {
        setDataResult((data) => {
          return [...data, doc.data()];
        });
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const questionData = await getDocs(collection(db, "Users"));
      questionData.forEach((doc) => {
        setDataUser((data) => [...data,doc.data() ]);
      });
    };
    getData();
  }, []);

  return (
    <dataContext.Provider
      value={{
        dataUser,
        dataResult,
        arraySubjects,
        subject,
        setSubject,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
