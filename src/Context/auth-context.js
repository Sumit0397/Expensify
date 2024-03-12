import React from "react";

const AuthContext = React.createContext({
    userId : "",
    login : (uid) => {},
    logout : () => {},
    isLoggedIn : false,
    userSince : ""
})

export default AuthContext;