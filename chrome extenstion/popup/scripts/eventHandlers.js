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