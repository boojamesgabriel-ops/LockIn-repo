const stateKey = "LockInState";

const default_state = {
  sessionDuration: 0,
  sessionBreak: 0,
  isQuickieMode: false,
  hasSelection: false,
  originalSessionDuration: 0,
  isOnBreak: false,
  lastModified: Date.now()
};

async function loadState() {
  const result = await chrome.storage.local.get(stateKey);
  return result[stateKey] || default_state;
}

async function saveState(newState){
  const stateTosave = {...newState, lastModified: Date.now() };
  await chrome.storage.local.set({[stateKey]: stateTosave});
  return true;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);
  if (message.action === "saveState") {
    saveState(message.payload).then(success => sendResponse({ success }));
    return true;
  }

  if (message.action === "loadState") {
    loadState().then(state => sendResponse({ state }));
    return true;
  }
});



