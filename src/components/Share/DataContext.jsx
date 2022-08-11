import { createContext, useEffect, useRef, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [data, setData] = useState([]);


  return (
    <dataContext.Provider value={{ data, currentAnswer, setCurrentAnswer }}>{children}</dataContext.Provider>
  );
};
