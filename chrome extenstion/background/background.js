const BASE_URL = "http://localhost:5000/api";
const LOCAL_STORAGE_KEY = "coderecordUserData";

async function checkReminders() {
  let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
  localData = localData[LOCAL_STORAGE_KEY];
  if (!localData || !localData.token) {
    return;
  }
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  try {
    let reminderObj = localData.reminderObj;
    if (!reminderObj) {
      let response = await fetch(`${BASE_URL}/users/reminders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localData.token}`,
        },
      });
      response = await response.json();
      if (!response.success) {
        throw new Error(response.message);
      }
      reminderObj = {
        date: now,
        reminders: response.data,
      };
      localData.reminderObj = reminderObj;
      chrome.storage.sync.set({ [LOCAL_STORAGE_KEY]: localData });
    } else if (reminderObj.date != now && reminderObj.reminders.length ) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "./icon.png",
        title: "Coderecord",
        message: "You got some notifications!",
      });
      chrome.action.setBadgeText({
        text: reminderObj.reminders.length.toString(),
      });
    } else if (!reminderObj.reminders.length) {
      chrome.action.setBadgeText({text: "",});
    }
  } catch (error) {
    console.log("Error while getting reminders", error);
    chrome.action.setBadgeText({text: "",});
  }
}

// chrome.runtime.onStartup.addListener(function() {
//   checkReminders();
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the tab has finished loading
  if (changeInfo.status === "complete") {
    checkReminders();
  }
});

// function openPopup () {
//     chrome.action.openPopup();
// }

function showNotification() {
  // chrome.notifications.create({
  //   type: 'basic',
  //   iconUrl: './icon.png',
  //   title: 'My Extension',
  //   message: 'This is a notification from My Extension!',
  // });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabId = tabs[0].id;
    // Do something with the tab ID
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: "../popup/main/main.html",
    });
  });
  // chrome.windows.create({
  //   type: "popup",
  //   url: "../popup.html",
  //   width: 400,
  //   height: 500
  // });
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Message received")
//     if (message.type === 'SHOW_POPUP') {
//       const { problem } = message;
//       chrome.runtime.sendMessage(message);
//       // console.log('789 problem', problem, chrome.notifications);
//         // showNotification();
//       // chrome.browserAction.setPopup()
//       // openPopup();
//     }
// });
chrome.runtime.onMessage.addListener((message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});
