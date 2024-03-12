import React from "react";

const ThemeContext = React.createContext({
    theme : null,
    toggleTheme : (theme) => {}
})

export default ThemeContext;