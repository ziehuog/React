import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
const navigate = useNavigate();

  
  const [remaining, setRemaining] = useState(1000 * 60*3);
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
      navigate("/test/score");
    }

    return () => {
      clearInterval(timerId);
    };
  }, [remaining]);
  console.log(remaining)
  return <TimerContext.Provider value={{timeOver, remaining}}>{children}</TimerContext.Provider>;
};
