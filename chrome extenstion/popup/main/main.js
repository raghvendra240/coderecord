const LOCAL_STORAGE_KEY = 'coderecordUserData';
const BASE_URL = 'http://localhost:5000/api';


async function checkAuthentication() {
    
    const localStorageStr = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
    console.log(localStorageStr);
    const localData = JSON.parse(localStorageStr);
    if (!localData || !localData.token) {
       document.querySelector('.not-authenticated').style.display = 'block';
       return;
    }

    //Verify the token
    const config = {
        headers: { Authorization: `Bearer ${localData.token}` }
    };
    let response = fetch(`${BASE_URL}/users/me`, config);
    console.log(response);
    
}

checkAuthentication();