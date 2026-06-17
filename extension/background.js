const stateKey = "LockInState";

console.log("[Background] service worker started");

async function loadState() {
  const result = await chrome.storage.local.get([stateKey]);
  return result[stateKey] ?? {
    sessionDuration: 0,
    sessionBreak: 0,
    isQuickieMode: false,
    hasSelection: false,
    originalSessionDuration: 0,
    isOnBreak: false,
    controlState: "start",
    breakBtnText: "break",
    streakCount: 0,
    currentStreak: 0,
    lastSessionDate: "",
    lastModified: Date.now()
  }
}

async function saveState(newState){
  const stateTosave = {...newState, lastModified: Date.now() };
  await chrome.storage.local.set({[stateKey]: stateTosave});
  return true;
}

chrome.runtime.onMessage.addListener(async (message, sender) => {
  try {
    console.log("[Background] Message received: ", message);

    if (message.action === "loadState") {
      const state = await loadState();           // call your existing loadState()
      console.log("[Background] loadState returning:", state);
      return { success: true, state };           // resolves and sends state back to sender
    }

    if (message.action === "saveState") {
      const state = message.state ?? message.payload;

      if (!state) {
        console.warn("[Background] saveState called with no state payload");

        return { success: false, error: "no state provided" };
      }
      await saveState(state);
      return { success: true};
    }
    
    return { success: false, error: "unknown action"};
  } catch (err) {
     console.error("[Background] message handler error:", err);
    return { success: false, error: err?.message || String(err) };
  }
});



