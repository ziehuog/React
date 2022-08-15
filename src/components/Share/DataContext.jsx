import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../utils/firebase";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [dataResult, setDataResult] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const questionData = await getDocs(collection(db, "Result"));
  //     questionData.forEach((doc) => {
  //       const resultUser = doc.data();
  //       // console.log(resultUser)
  //       setDataResult(resultUser, { ...dataResult})
       
  //     });
  //   };
  //   getData();
  // }, []);
  // console.log(dataResult);


  return (
    <dataContext.Provider value={{ dataResult, currentAnswer, setCurrentAnswer }}>{children}</dataContext.Provider>
  );
};
