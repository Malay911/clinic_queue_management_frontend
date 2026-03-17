import { api } from "./api";

export const getClinicInfo = async () => {
    const response = await api.get("/admin/clinic");
    return response.data;
};

export const getClinicUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

export const createUser = async (data) => {
    const response = await api.post("/admin/users", data);
    return response.data;
};
