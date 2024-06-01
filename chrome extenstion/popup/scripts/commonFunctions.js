const LOCAL_STORAGE_KEY = 'coderecordUserData';
// const BASE_URL = "http://localhost:5000/api";
const FE_BASE_URL = 'https://coderecord.co/';
const BASE_URL = "https://coderecord-server.onrender.com/api";

const getLocalData = async () => {
    let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
    return localData[LOCAL_STORAGE_KEY] || {};
}

const setLocalData = async (data) => {
    const localData = await getLocalData();
    const updatedData = {
        ...localData,
        ...data
    }
    await chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: updatedData });
}


/*-----------------ERROR RELATED--------*/
const setError = (msg) => {
    if (!msg || !msg.length) {
        msg = 'Something went wrong. Please try again later.';
    }
    const errorContainer = document.querySelector('.error-text-container');
    const errorText = document.querySelector('.error-text');
    errorText.textContent = msg;
    errorContainer.classList.remove('hidden');
}
const clearError = () => {
    const errorContainer = document.querySelector('.error-text-container');
    const errorText = document.querySelector('.error-text');
    errorText.textContent = '';
    errorContainer.classList.add('hidden');
}


/* -----------------LOGIN RELATED--------*/
const onAuthenticationSuccess = async (token, user) => {
    const data = {
        token: token,
        user: user
    }
    await setLocalData(data);
    location.reload();
}

const loadOtpScreen = async () => {
    document.querySelector('#signup-form').classList.add('hidden');
    document.querySelector('#login-form').classList.add('hidden');
    document.querySelector('#otp-form').classList.remove('hidden');
}

const onSignupSuccess = async (userId) => {
    await setLocalData({
         userId: userId,
         otpScreenPending: true
    });
    loadOtpScreen();
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

/* Token related */
const getToken = async () => {
    try {
        const localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
        return localData[LOCAL_STORAGE_KEY]['token'];
    } catch (error) {
        return;
    }
}

/*------------------Loader Related--------------- */
const showLoader = () => {
    document.querySelector('.loader-tmpl').classList.remove('hidden');
}
const hideLoader = () => {
    document.querySelector('.loader-tmpl').classList.add('hidden');
}