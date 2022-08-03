import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const Context = createContext();

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

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
const navigate = useNavigate();

  
  const [remaining, setRemaining] = useState(1000 * 10);
  const [timeOver, setTimeOver] = useState("");
  useEffect(() => {
    const timerId = setInterval(() => {
      setRemaining(remaining - 1000);
    }, 1000);

    if (remaining <= 10000) {
      setTimeOver("text-red-600");
    }

    if (remaining <= 0) {
      clearInterval(timerId);
      navigate('/score')
    }

    return () => {
      clearInterval(timerId);
    };
  }, [remaining]);
  return <TimerContext.Provider value={{timeOver, remaining}}>{children}</TimerContext.Provider>;
};
