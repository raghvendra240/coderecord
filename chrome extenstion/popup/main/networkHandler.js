const BASE_URL = "http://localhost:5000/api"

const setError = (msg = 'Something went wrong') => {
    const error = document.querySelector('.error-text');
    error.textContent = msg;
    error.style.display = 'block';
}
const clearError = () => {
    const error = document.querySelector('.error-text');
    error.textContent = '';
    error.style.display = 'none';
}

const login = async (email, password) => {
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
            return { error: result.error };
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

    const response = await login(email, password);
    if (response.error) {
        setError();
    } else {
        // Save the token in local storage
        // const localData = (await chrome.storage.local.get(LOCAL_STORAGE_KEY)) || {};
        const data = {
            token: response.token,
            user: response.user
        }
        chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: data }, () => {
            console.log('Token saved in local storage');
            window.location.href = "./main.html";
        });
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
