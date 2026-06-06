chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "saveState") {
    chrome.storage.local.set(message.data, () => {
      console.log("State saved:", message.data);
      sendResponse({status: "ok"});
    });
    return true;
  }

  if (message.type === "loadState"){
    chrome.storage.local.get([
      "sessionDuration",
      "sessionBreak",
      "isQuickieMode",
      "hasSelection",
      "originalSessionDuration",
      "isOnBreak"
    ],(result)=>{
      console.log("State loaded:", result);
      sendResponse(result);
    });
    return true;
  }
});

