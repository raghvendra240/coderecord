import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEY } from './../utils/globalConstants';


export const fetchSolvedProblems = async (userId) => {
    const localDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    const localData = JSON.parse(localDataStr);
    const config = {
        headers: { Authorization: `Bearer ${localData.token}` }
    };
    try {
        let response = await axios.get(`${BASE_URL}/solved-problems`, config);
        response = response.data;
        if (response.success) {
            return response.data;
        } else {
            return;
        }
    } catch (error) {
        console.log("Error while fetching solved problems", error);
        return;
    }

};