import axios from 'axios';

export const api=axios.create({
    baseURL:"https://cmsback.sampaarsh.cloud",
    headers:{
        "Content-Type":"application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.resolve(error.response);
        }
        return Promise.resolve({ data: { error: "Network error" } });
    }
);