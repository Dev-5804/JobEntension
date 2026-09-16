chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['job-tracker-applications'])
})