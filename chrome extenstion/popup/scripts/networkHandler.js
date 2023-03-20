
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
        return {error: true};
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





