import {BASE_URL, LOCAL_STORAGE_KEY} from './../utils/globalConstants';
const axios = require('axios');

export const getUserInfo = async () => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!localData || !localData.token) {
        return null;
    } 
    const config = {
        headers: { Authorization: `Bearer ${localData.token}` }
    };
    const response = await axios.get(`${BASE_URL}/users/me`, config);
    if (response.success) {
        return response.data;
    } 
    return null;
};
