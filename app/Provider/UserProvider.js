"use client";
import React, { useEffect, useState } from "react";

export const UserContext = React.createContext({

    getToken: "",
    getName: "",
    nameHandler: () => {},
    tokenHandler: () => {},
    logout: () => {
        sessionStorage.clear();
        location.reload();
    },
});


const UserProvider = (props) => {
    const [getName, setName] = useState('');
    const [getToken, setToken] = useState('');

    useEffect(() => {
        setName(sessionStorage.getItem("name"));
        setToken(sessionStorage.getItem("token"));
    }, [])

    console.log(getName, getToken, "User Provider logs");


    const { children } = props;

    function tokenHandler(token) {
        setToken(token);
        sessionStorage.setItem("token", token);
    }

    function nameHandler(name) {
        setName(name);
        sessionStorage.setItem("name", name);
    }

    function logout(){
        setName("");
        setToken("");
    }

    const valueObj = {
        getName,
        getToken,
        tokenHandler,
        nameHandler,
        logout,
    };
 


    return(
        <>
            <UserContext.Provider value={valueObj} >
                {children}
            </UserContext.Provider>
        </>
    );
};

export default UserProvider;