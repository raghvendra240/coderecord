
const getAuthHeader = async () => {
    let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
    localData = localData[LOCAL_STORAGE_KEY];
    if (!localData || !localData.token) {
       return;
    }

    return { Authorization: `Bearer ${localData.token}` };
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
        return {error: true};
    }
}





