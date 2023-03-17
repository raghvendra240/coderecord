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

/* -----------------SILENT MODE--------*/
function setSilentMode() {
    document.querySelector('.silent-mode-switch').checked = true;
    document.querySelector('.silent-mode-text').textContent = 'Silent Mode On';
}
function removeSilentMode() {
    document.querySelector('.silent-mode-switch').checked = false;
    document.querySelector('.silent-mode-text').textContent = 'Silent Mode Off';
}

async function silentModeUpdateRequest(token, silentMode) {
    const url = `${BASE_URL}/users/silent-mode`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const body = JSON.stringify({ silentMode: silentMode });
    const res = await fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: body
    });
    return res.json();
}