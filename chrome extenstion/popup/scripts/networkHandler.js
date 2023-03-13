const BASE_URL = "http://localhost:5000/api"

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

const loginNWRequest = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const result = await response.json();
        if (result.success) {
            const { token, user } = result.data;
            return { token, user };
        } else {
            return { error: result.error || true };
        }
    } catch (error) {
        console.log(error);
    }
}

const loginHandler = async (form) => {
      // Get the form data
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
const signupHandler = async (form) => {};
const otpHandler = async (form) => {};

const formHandler = {
    'login-form': loginHandler,
    'signup-form': signupHandler,
    'otp-form': otpHandler,
}

const form = document.getElementsByClassName("form")[0];
form.addEventListener('submit', function(event) {
    event.preventDefault();
    clearError();
    formHandler[event.target.id](event.target);
  });
