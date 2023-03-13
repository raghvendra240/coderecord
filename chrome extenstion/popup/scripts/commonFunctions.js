const LOCAL_STORAGE_KEY = 'coderecordUserData';
const BASE_URL = "http://localhost:5000/api";

/*-----------------ERROR RELATED--------*/
const setError = (msg = 'Something went wrong') => {
    const errorContainer = document.querySelector('.error-text-container');
    const errorText = document.querySelector('.error-text');
    errorText.textContent = msg;
    errorContainer.style.display = 'flex';
}
const clearError = () => {
    const errorContainer = document.querySelector('.error-text-container');
    const errorText = document.querySelector('.error-text');
    errorText.textContent = '';
    errorContainer.style.display = 'none';
}


/* -----------------LOGIN RELATED--------*/
const onLoginSuccess = (token, user) => {
    const data = {
        token: token,
        user: user
    }
    chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: data }, () => {
        console.log('Token saved in local storage');
        location.reload();
    });
}


