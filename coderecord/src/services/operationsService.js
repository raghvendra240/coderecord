import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEY } from './../utils/globalConstants';

import { getLocalData, saveLocalData } from './localDataService';

const SORT_OPTIONS = "sortOptions";

export const fetchSortOptions = async () => {
    const localData = await getLocalData();
    if (localData & localData[SORT_OPTIONS]) {
        return localData[SORT_OPTIONS];
    }
    const config = {
        headers: { Authorization: `Bearer ${localData.token}` }
    };
    try {
        let response = await axios.get(`${BASE_URL}/operations/sort`, config);
        response = response.data;
        if (response.success) {
            saveLocalData({...localData, SORT_OPTIONS: response.data});
            return response.data;
        } else {
            throw new Error(response.error);
        }
    } catch (error) {
        console.log("Error while fetching sort options", error);
        return [];
    }

}

export const fetchFilterOptions = () => {

}