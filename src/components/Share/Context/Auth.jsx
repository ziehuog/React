import { createContext, useState, React } from "react";


//Auth

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("id"));

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
      }}
    >
      {children}
    </Auth.Provider>
  );
};

//question
