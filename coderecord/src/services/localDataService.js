import { LOCAL_STORAGE_KEY } from '../utils/globalConstants';
// import ChromePromise from 'chrome-promise';

// const chromep = ChromePromise();

export const saveLocalData = (data = {}) => {
    const str = JSON.stringify(data);
    return localStorage.setItem(LOCAL_STORAGE_KEY, str);
}

export const getLocalData = () => {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}