import { createContext, useState, React } from "react";

 
// export const Context = createContext();

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



//question
export const questionContext = createContext();



