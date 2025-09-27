import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"

export const getProfile = async (token) => {
    return axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const updateProfile = async (token, data) => {
    return axios.put(`${API_URL}/profile`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const uploadProfileImage = async (token, formData) => {
    return axios.put(`${API_URL}/profile/image`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteProfileImage = async (token) => {
    return axios.delete(`${API_URL}/profile/image`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};