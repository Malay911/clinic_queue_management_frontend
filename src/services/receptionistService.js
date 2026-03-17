import { api } from "./api";

export const getDailyQueue = async (dateStr) => {
    const response = await api.get(`/queue?date=${dateStr}`).catch(e => e.response);
    return response?.data;
};

export const updateQueueStatus = async (id, status) => {
    const response = await api.patch(`/queue/${id}`, { status }).catch(e => e.response);
    return response?.data;
};
