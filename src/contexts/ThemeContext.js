import { React, createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState()

    return <ThemeContext.Provider>
        {props.children}
    </ThemeContext.Provider>
}