import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})
    const getLoggedinUser = async () => {
        const user = await AsyncStorage.getItem("LOGGED_IN_USER")
        setCurrentUser(JSON.parse(user))
        console.log(user);
    }
    useEffect(() => {
        getLoggedinUser()
    }, [])
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

// import React,{cret} from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const AuthContext = React.createContext();
// export const AuthContextProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState({})
//     const getLoginUser = async () => {
//         const user = await AsyncStorage.getItem("LOGGED_IN_USER")
//         setCurrentUser(user)
//     }
//     useEffect(() => {
//         getLoginUser()
//     }, [])
//     return (
//         <AuthContext.Provider>
//         { children }
//         < /AuthContext.Provider>
//     )

//     //     return (
//     //         <AuthContext.Provider value= {{ currentUser }
//     // }>
//     //     { children }
//     //     < /AuthContext.Provider>
//     //    )
// }