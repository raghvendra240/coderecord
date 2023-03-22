
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
        return await response.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}

const signupNWRequest = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return await response.json();
    } catch (error) {
        console.log("Error occurred while signUp", error);
        return {error: error};
    }
}

const verifyOtpNWRequest = async (otpData) => {
    try {
        const response = await fetch(`${BASE_URL}/users/verify-otp`, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(otpData)
        })
        return await response.json();
    } catch (error) {
        console.log("Error occurred while verifying otp", error);
    }
}

async function silentModeUpdateRequest(silentMode) {
    const url = `${BASE_URL}/users/silent-mode`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`
    }
    const body = JSON.stringify({ silentMode: silentMode });
    const res = await fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: body
    });
    return res.json();
}

const getReminders = async () => {
    const url = `${BASE_URL}/users/reminders`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`
    }
    const res = await fetch(url, {
        method: 'GET',
        headers: headers
    });
    return res.json();
}





