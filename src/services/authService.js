import { api } from "./api";

export const loginService=async(data)=>{
    const response=await api.post("/auth/login",data);
    if(response.data && !response.data.error){
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
    }
    return response.data;
}

export const logoutService=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const getUserData=()=>{
    return JSON.parse(localStorage.getItem("user"));
}

export const getToken=()=>{
    return localStorage.getItem("token");
}