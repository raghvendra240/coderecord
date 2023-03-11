// Listen for tab updates
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // Check if the tab has finished loading
//     if (changeInfo.status === 'complete') {
//       chrome.notifications.create({
//         type: 'basic',
//         iconUrl: './icon.png',
//         title: 'My Extension',
//         message: 'This is a notification from My Extension!',
//       });
//     }
//   });

// function openPopup () {
//     chrome.action.openPopup();
// }

function showNotification () {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: './icon.png',
    title: 'My Extension',
    message: 'This is a notification from My Extension!',
  });
}

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'submittedProblem') {
        const { problem } = message;
        // console.log('789 problem', problem, chrome.notifications);
          showNotification();
        // chrome.browserAction.setPopup()
        // openPopup();
      }
  });