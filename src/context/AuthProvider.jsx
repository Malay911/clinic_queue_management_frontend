import { createContext, useContext, useEffect, useState } from "react";
import { getToken, getUserData } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        const token=getToken();
        if(token){
            const userData=getUserData();
            setUser(userData);
        }
        setLoading(false);
    },[])

    const loginAuth=(userData)=>{
        setUser(userData);
    }

    const logoutAuth=()=>{
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,loginAuth,logoutAuth,loading,isAuthenticated:user!==null,isPatient:user?.role==="patient",isDoctor:user?.role==="doctor",isReceptionist:user?.role==="receptionist"}}>{children}</AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
