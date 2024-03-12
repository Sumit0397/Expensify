import React, { useState , useEffect } from 'react';
import AuthContext from './auth-context';

const AuthProvider = (props) => {

    const [userId, setUserId] = useState(null);
    const [userSince, setUserSince] = useState(null);
    const [isLoggedIn , setIsLoggedIn] = useState(false);


    useEffect(() => {
        if (userId === null && localStorage.length !== 0) {
            setUserId(localStorage.getItem("user"));
            setUserSince(localStorage.getItem("usersince"));
            setIsLoggedIn(localStorage.getItem("logged"));
        }
    }, []);

    const loginHandler = (uid, userSince) => {
        setUserId(localStorage.getItem("user"));
        setUserSince(localStorage.getItem("usersince"));
        setIsLoggedIn(true);
        localStorage.setItem("user", uid);
        localStorage.setItem("usersince", userSince);
        localStorage.setItem("logged" , true);
    }

    const logoutHandler = () => {
        setUserId(null);
        setUserSince(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("usersince");
        localStorage.removeItem("logged");
    }


    const defaultState = {
        userId: userId,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        userSince: userSince
    }

    return (
        <AuthContext.Provider value={defaultState}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
