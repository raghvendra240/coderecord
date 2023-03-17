/*------Logout----- */
const onLogoutClick = async () => {
    await chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: null });
    location.reload();
};

/*-----------------LOGIN RELATED--------*/
const loginHandler = async (form) => {
    const formData = new FormData(form);
    const password = formData.get('password');
    const email = formData.get('email');

  const response = await loginNWRequest(email, password);
  if (response.error) {
      setError();
  } else {
      onLoginSuccess(response.token, response.user);
  }
};

/*-----------------SIGNUP RELATED--------*/

const signupHandler = async (form) => {};

/*-----------------OTP RELATED--------*/
const otpHandler = async (form) => {};


const formHandler = {
    'login-form': loginHandler,
    'signup-form': signupHandler,
    'otp-form': otpHandler,
}


/*----------AUTHENTICATION FORM SWITCH---------------------- */
function switchToSignup(event) {
    event.preventDefault();
    document.querySelector('#login-form').style.display = 'none';
    document.querySelector('#signup-form').style.display = 'flex';
}
function switchToLogin(event) {
    event.preventDefault();
    document.querySelector('#login-form').style.display = 'flex';
    document.querySelector('#signup-form').style.display = 'none';
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