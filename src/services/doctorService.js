import { api } from "./api";

export const getDoctorQueue = async () => {
    const response = await api.get("/doctor/queue").catch(e => e.response);
    return response?.data;
};

export const addPrescription = async (appointmentId, data) => {
    const response = await api.post(`/prescriptions/${appointmentId}`, data).catch(e => e.response);
    return response?.data;
};

export const addReport = async (appointmentId, data) => {
    const response = await api.post(`/reports/${appointmentId}`, data).catch(e => e.response);
    return response?.data;
};

