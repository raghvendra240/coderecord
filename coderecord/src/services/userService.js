import {BASE_URL, LOCAL_STORAGE_KEY} from './../utils/globalConstants';
import axios from 'axios';

export const getUserInfo = async () => {
    const localDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    const localData = JSON.parse(localDataStr);
    if (!localData || !localData.token) {
        return null;
    } 
    const config = {
        headers: { Authorization: `Bearer ${localData.token}` }
    };
    let response = await axios.get(`${BASE_URL}/users/me`, config);
    response = response.data;
    if (response.success) {
        return response.data;
    } 
    return null;
};

export const login = async (userData) => {
    let response = await axios.post(`${BASE_URL}/users/login`, userData);
    response = response.data;
    if (response.success) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data));
        return true;
    }
    return null;
}
