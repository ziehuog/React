import { createContext, useState } from 'react'

export const Context = createContext()

export const Auth = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [authUsername, setAuthUsername] = useState(localStorage.getItem('username'))
    return(
        <Auth.Provider value={{token, setToken, authUsername, setAuthUsername}}>
            {children}
            {/* {console.log(token)} */}
        </Auth.Provider>
    )

}