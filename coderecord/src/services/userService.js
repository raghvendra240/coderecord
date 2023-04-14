import {BASE_URL} from './../utils/globalConstants';
import { getLocalData, saveLocalData } from './localDataService';
import axios from 'axios';

export const getUserInfo = async () => {
    const localData = getLocalData();
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
    try {
        let response = await axios.post(`${BASE_URL}/users/login`, userData);
        response = response.data;
        if (response.success) {
            saveLocalData(response.data);
            return {msg: 'Login successful', error: false};
        }
    } catch (error) {
        const msg = error.response.data.message;
        return {msg: msg, error: true};
    }
}
