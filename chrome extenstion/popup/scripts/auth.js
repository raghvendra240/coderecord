
async function loadReminders() {
    const reminders = await getReminders();
    if (!reminders.success || !reminders.data.length) {
        return;
    }
    document.querySelector('.reminder-section').classList.remove('hidden');
    const reminderList = document.querySelector('.reminder-list');
    const reminderItemTemplate = document.querySelector('#reminder-item-template');
    reminders.data.forEach(reminder => {
        const reminderItem = reminderItemTemplate.content.cloneNode(true);
        const reminderItemContainer = reminderItem.querySelector('.reminder-item');
        reminderItemContainer.textContent = reminder.problemName;
        reminderItemContainer.setAttribute('data-url', reminder.problemUrl);
        reminderItemContainer.addEventListener('click', onReminderClick);

        reminderList.appendChild(reminderItem);
    });
}

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
    const leetcodeSolved = response.data.filter(problem => problem.platformName === 'leetcode');
    const leetcodeSolvedCount = document.querySelector('.leetcode-solved');
    leetcodeSolvedCount.textContent = leetcodeSolved.length || 0;
    const gfgSolved = response.data.length - leetcodeSolved.length;
    const gfgSolvedCount = document.querySelector('.gfg-solved');
    gfgSolvedCount.textContent = gfgSolved.length || 0;
}

function loadUserDetails(user) {
    document.querySelector('.welcome-msg').textContent = `Hello ${user.firstName}`;
    loadSolvedProblems();
}

function loadAuthenticatedBlock (userData) {
    document.querySelector('.not-authenticated').style.display = 'none';
    document.querySelector('.authenticated').style.display = 'block';
    loadUserDetails(userData);
    document.querySelector('.log-out-btn').addEventListener('click', onLogoutClick);
    if (userData['silentMode']) {
        setSilentMode();
    } else {
        removeSilentMode();
    }
    document.querySelector('.silent-mode-switch').addEventListener('change', onSilentModeChange);
    loadReminders();
}

function loadNotAuthenticatedBlock () {
    document.querySelector('.not-authenticated').style.display = 'block';
    document.querySelector('.authenticated').style.display = 'none';
    document.querySelector('.login-to-signup').addEventListener('click', switchToSignup);
    document.querySelector('.singup-to-login').addEventListener('click', switchToLogin);
}



async function checkAuthentication() {
    try {
        showLoader();
        let localData = await getLocalData();
        if (localData && localData.otpScreenPending) {
            loadOtpScreen();
            return;
        }
        if (!localData || !localData.token) {
           throw new Error('No token found');
        }
        console.log(localData);

    
        const config = {
            headers: { Authorization: `Bearer ${localData.token}` }
        };
        let response = await fetch(`${BASE_URL}/users/me`, config);
        response = await response.json();
        if (!response.success) {
           throw new Error('Invalid Token or user');
        }
        loadAuthenticatedBlock(response.data);
    } catch (err) {
        console.log(err);
        loadNotAuthenticatedBlock();
    } finally {
        hideLoader();
    }
   
}

checkAuthentication();