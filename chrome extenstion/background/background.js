const BASE_URL = "http://localhost:5000/api";
const LOCAL_STORAGE_KEY = "coderecordUserData";

function showNotification(reminderLength = 2, firstName = "Raghvendra") {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "../../assets/images/logo_min_bg--cropped.png",
    title: `Hey ${firstName}!`,
    message: `Just a quick reminder that you have ${
      reminderLength > 1 ? "some problems" : "a problem"
    } due today. Don't forget to submit it`,
  });
}

function setBadgeText(text = "") {
  chrome.action.setBadgeText({ text: text });
}

async function checkReminders() {
  let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
  localData = localData[LOCAL_STORAGE_KEY];
  if (!localData || !localData.token) {
    return;
  }
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  now = now.toDateString();

  try {
    let reminderObj = localData.reminderObj;
    if (!reminderObj || reminderObj.date != now) {
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
      await chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: localData });
      setBadgeText(reminderObj.reminders.length.toString());
      showNotification(reminderObj.reminders.length, localData.user.firstName);
    } else if (reminderObj.date == now && reminderObj.reminders.length) {
      setBadgeText(reminderObj.reminders.length.toString());
    } else {
      setBadgeText("");
    }
  } catch (error) {
    console.log("Error while getting reminders", error);
    setBadgeText("");
  } finally {
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    checkReminders();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});
