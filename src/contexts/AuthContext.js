import { React, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isAuth, setIsAuth] = useState(true)

    return <AuthContext.Provider value={[isAuth, setIsAuth]}>
        {props.children}
    </AuthContext.Provider>
}