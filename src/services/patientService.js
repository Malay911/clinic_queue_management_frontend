import { api } from "./api";

export const bookAppointment = async (data) => {
    const response = await api.post("/appointments", data).catch(e => e.response);
    return response?.data;
};

export const getMyAppointments = async () => {
    const response = await api.get("/appointments/my").catch(e => e.response);
    return response?.data;
};

export const getAppointmentById = async (id) => {
    const response = await api.get(`/appointments/${id}`).catch(e => e.response);
    return response?.data;
};

export const getMyPrescriptions = async () => {
    const response = await api.get("/prescriptions/my").catch(e => e.response);
    return response?.data;
};

export const getMyReports = async () => {
    const response = await api.get("/reports/my").catch(e => e.response);
    return response?.data;
};

