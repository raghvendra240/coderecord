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
  // chrome.notifications.create({
  //   type: 'basic',
  //   iconUrl: './icon.png',
  //   title: 'My Extension',
  //   message: 'This is a notification from My Extension!',
  // });
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tabId = tabs[0].id;
    // Do something with the tab ID
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: '../popup/main/main.html'
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
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  })