import axios from "axios";

export const getRequest = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: {
            Authorization: `Bearer: ${token}`,
        }
    });

    return res;
}

export const postRequest = async (url, data, token) => {
    const res = await axios.post(`/api/${url}`, data, {
        headers: {
            Authorization: `Bearer: ${token}`,
        }
    });

    return res;
}

export const putRequest = async (url, data, token) => {
    const res = await axios.put(`/api/${url}`, data, {
        headers: {
            Authorization: `Bearer: ${token}`
        }
    });

    return res;
}

export const deleteRequest = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: {
            Authorization: `Bearer: ${token}`
        }
    });

    return res;
}