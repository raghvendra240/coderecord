/*------Logout----- */
const onLogoutClick = async () => {
    await chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: null });
    location.reload();
};

/*-----------------LOGIN RELATED--------*/
const loginHandler = async (form) => {
    try {
        showLoader();
        const formData = new FormData(form);
        const password = formData.get('password');
        const email = formData.get('email');
    
        const response = await loginNWRequest(email, password);
        if (!response.success) {
            throw new Error(response.message);
        }
        onAuthenticationSuccess(response.data.token, response.data.user);
        
    } catch (error) {
        setError(error.message);
    } finally {
        hideLoader();
    }
 
};

/*-----------------SIGNUP RELATED--------*/

const signupHandler = async (form) => {
    try {
        showLoader();
        const formData = new FormData(form);
        const password = formData.get('password');
        const email = formData.get('email');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const response = await signupNWRequest({firstName, lastName, email, password});
        if (!response.success) {
            throw new Error(response.message);
        }
        onSignupSuccess(response.data.userId);
        
    } catch (error) {
        setError(error.message);
    } finally {
        hideLoader();
    }
};

/*-----------------OTP RELATED--------*/
const otpHandler = async (form) => {
    try {
        showLoader();
        const formData = new FormData(form);
        const otp = formData.get('otp');
        const localData = await getLocalData();
        const userId = localData.userId;
        const response = await verifyOtpNWRequest({userId, otp});
        if (!response.success) {
            throw new Error(response.message);
        }
        await setLocalData({otpScreenPending: false});
        onAuthenticationSuccess(response.data.token, response.data.user);
    } catch (error) {
        setError(error.message);
    } finally {
        hideLoader();
    }
};


const formHandler = {
    'login-form': loginHandler,
    'signup-form': signupHandler,
    'otp-form': otpHandler,
}


/*----------AUTHENTICATION FORM SWITCH---------------------- */
function switchToSignup(event) {
    event.preventDefault();
    document.querySelector('#login-form').classList.add('hidden');
    document.querySelector('#signup-form').classList.remove('hidden');
}
function switchToLogin(event) {
    event.preventDefault();
    document.querySelector('#login-form').classList.remove('hidden');
    document.querySelector('#signup-form').classList.add('hidden');
}

async function switchToSignup (event) {
    event.preventDefault();
    document.querySelector('#login-form').classList.add('hidden');
    document.querySelector('#otp-form').classList.add('hidden');
    document.querySelector('#signup-form').classList.remove('hidden');
 }

/*---------------------SILENT MODE SWITCH-------------- */
async function onSilentModeChange(event) {
    document.querySelector('.silent-mode-loader').style.display = 'block';
    document.querySelector('.silent-mode-text').textContent = 'Updating...';
    document.querySelector('.silent-mode-wrapper').classList.add('cursor-not-allowed');
    const silentMode = event.target.checked;
    try {
        const response = await silentModeUpdateRequest(silentMode);
        if (!response.success) {
            throw new Error('Error in silent mode update');
        }
        let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
        localData = localData[LOCAL_STORAGE_KEY];
        localData['user']['silentMode'] = silentMode;
        chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: localData }, () => {
            console.log('Silent mode updated');
        });
    } catch (error) {
        console.log("Error in silent mode update", error)
    } finally {
        document.querySelector('.silent-mode-text').textContent = silentMode ? 'Silent Mode On' : 'Silent Mode Off';
        document.querySelector('.silent-mode-wrapper').classList.remove('cursor-not-allowed');
        document.querySelector('.silent-mode-loader').style.display = 'none';
    }
}

/*---------------------Reminder click-------------- */
async function onReminderClick(event) {
    const reminderDOM = event.target;
    const url = reminderDOM.getAttribute('data-url');
    chrome.tabs.create({ url});

}

/*---------------------Dashboard btn click-------------- */

async function onDashboardClick(event) {
    event.preventDefault();
    const token = await getToken();
    const url = `http://localhost:3000/?token=${token}`;
    chrome.tabs.create({ url});
}
 