

async function loadSolvedProblems() {
    //get the token from local storage
    let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
    localData = localData[LOCAL_STORAGE_KEY];
    if (!localData || !localData.token) {
        return;
    }
    //get the solved problems from the server
    const config = {
        headers: { Authorization: `Bearer ${localData.token}` }
    };
    let response = await fetch(`${BASE_URL}/solved-problems`, config);
    response = await response.json();
    if (!response.success) {
        return;
    }
    const solvedProblems = response.data;
    const numberOfProblemSolved = document.querySelector('.num-of-problem-solved');
    numberOfProblemSolved.textContent = solvedProblems.length;
}

function loadUserDetails(user) {
    document.querySelector('.welcome-msg').textContent = `Hello ${user.firstName}`;
    loadSolvedProblems();
}



async function checkAuthentication() {
    let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
    localData = localData[LOCAL_STORAGE_KEY];
    if (!localData || !localData.token) {
       document.querySelector('.not-authenticated').style.display = 'block';
       document.querySelector('.authenticated').style.display = 'none';
       return;
    }

    const config = {
        headers: { Authorization: `Bearer ${localData.token}` }
    };
    let response = await fetch(`${BASE_URL}/users/me`, config);
    response = await response.json();
    if (!response.success) {
        document.querySelector('.not-authenticated').style.display = 'block';
        document.querySelector('.authenticated').style.display = 'none';
        return;
    }
    document.querySelector('.not-authenticated').style.display = 'none';
    document.querySelector('.authenticated').style.display = 'block';
    const logoutBtn = document.querySelector('.log-out-btn');
    logoutBtn.addEventListener('click', onLogoutClick);
    loadUserDetails(response.data);
}

checkAuthentication();