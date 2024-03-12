import { useState } from "react";
import ThemeContext from "./theme-context";

const ThemeProvider = (props) => {
    
    const localTheme = localStorage.getItem("theme") || "light";
    const [theme , setTheme] = useState(localTheme);

    const toggleTheme = (data) => {
        setTheme(data);
        localStorage.setItem("theme" , data);   
    }

    const themeContext = {
        theme : theme,
        toggleTheme : toggleTheme
    }

    return (
        <ThemeContext.Provider value={themeContext}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;