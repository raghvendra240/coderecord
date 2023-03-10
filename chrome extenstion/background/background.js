// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the tab has finished loading
    if (changeInfo.status === 'complete') {
      // Execute content script in tab
       console.log('789 Website loaded', tab)
    }
  });
  