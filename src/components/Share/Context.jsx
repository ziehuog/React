import { createContext, useState } from "react";

export const Context = createContext();

// export const ContextProvider = ({children}) => {
//     const [index, setIndex] = useState(0);
//     const [data, setData] = useState([]);
//     const [currentAnswer, setCurrentAnswer] = useState("");
//     const [remaining, setRemaining] = useState(1000 * 60 * 10);
//     const [timeOver, setTimeOver] = useState("");
  
//     const [nextButton, setNextButton] = useState(false);
//     const [displayNext, setDisplayNext] = useState("block");
//     const [displayBack, setDisplayBack] = useState("hidden");
//     const [displaySubmit, setDisplaySubmit] = useState("none");
//     return(
//         <Context.Provider
//         value={{index,
//             nextButton,
//             // buttonBack,
//             // buttonNext,
//             // handleAnswer,
//             // refAnswer,
//             // point,
//             currentAnswer,
//             // buttonSubmit,
//             // answerKey,
//             displayNext,
//             displaySubmit,
//             remaining,
//             timeOver,
//             // navigateToScore,
//             displayBack,
//             data,}}
//         >
//             {children}
//         </Context.Provider>
//     )
// }

//Auth

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("id"));
  const [btnStart, setBtnStart] = useState(false);

  const [authUsername, setAuthUsername] = useState(
    localStorage.getItem("username")
  );
  return (
    <Auth.Provider
      value={{
        token,
        setToken,
        authUsername,
        setAuthUsername,
        btnStart,
        setBtnStart,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

//Timer
// export const
