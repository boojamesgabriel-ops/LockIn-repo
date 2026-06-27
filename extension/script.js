let sessionDuration = 0;
let sessionBreak = 0;
let timerInterval = null;
let isQuickieMode = false;
let hasSelection = false;
let originalSessionDuration = 0;
let isOnBreak = false;
let pendingDuration = null;
let control_btn = null;
let controlState = "start";
let breakBtnText = "break";
let compactHTML = "";
let streakCount = 0;
let currentStreak = 0;
let lastSessionDate = "";

const milestones = [
        { days: 3,  icon: 'icons/trophy.png',  className: 'trophy_extension', textClass: 'day_num_extension' },
        { days: 7,  icon: 'icons/trophy.png',  className: 'trophy_extension', textClass: 'day_num_extension' },
        { days: 10, icon: 'icons/star.png',    className: 'star_extension',   textClass: 'day_num_extension_other' },
        { days: 14, icon: 'icons/target.png',  className: 'target_extension', textClass: 'day_num_extension_other' },
        { days: 30, icon: 'icons/diamond.png', className: 'target_extension', textClass: 'day_num_extension_other' },
    ];

function popUp_extension(body_wrapper){
    body_wrapper.innerHTML = "";

    document.querySelector(".compact-container")?.remove();

    // In popUp_extension() — replace the current header button logic with:
    let headerRight = document.querySelector('.header-right');

    // Hide the original expand button container
    let expandContainer = document.querySelector('.expand-container');
    if (expandContainer) expandContainer.style.display = 'none';

    // Create a NEW container for the compact button
    let compact_container = document.createElement('div');
    compact_container.className = 'compact-container';

    let compact_btn = document.createElement('button');
    compact_btn.className = 'compact-btn';
    compact_btn.id = "compact-details-btn";

    let compact_icon = document.createElement('img');
    compact_icon.className = "compact_icon";
    compact_icon.src = 'icons/up.png';

    compact_btn.appendChild(compact_icon);
    compact_container.appendChild(compact_btn);
    headerRight.appendChild(compact_container);  // append to header, not to expandContainer

    let body_section = document.createElement('section');
    body_section.className = "extension-section";

    let extension_header_container = document.createElement('div');
    extension_header_container.className = "extension_header_container";

    let mascot = document.createElement('img');
    mascot.src = 'icons/mascot3.png';
    mascot.className = 'mascot_extension';

    let extension_header_text = document.createElement('span');
    extension_header_text.className = "extension_header_text";
    extension_header_text.textContent = "Strive to be 1% better today than you were yesterday.";

    extension_header_container.appendChild(mascot);
    extension_header_container.appendChild(extension_header_text);

    let streak_wrapper = document.createElement('div');
    streak_wrapper.className = 'streak_wrapper_extension';

    let streak_container = document.createElement('div');
    streak_container.className = 'streak_container_extension';

    let fire_container = document.createElement('div');
    fire_container.className = 'fire_container_extension';

    let next_container = document.createElement('div');
    next_container.className = 'next_container_extension';

    let fire_icon = document.createElement('img');
    fire_icon.className = 'fire_icon_extension';
    fire_icon.src = 'icons/fire2.png';

    let fire_text = document.createElement('span');
    fire_text.className = 'fire_text_extension';
    fire_text.textContent = 'Streak';

    fire_container.appendChild(fire_icon);
    fire_container.appendChild(fire_text);
    streak_container.appendChild(fire_container);

    let next = document.createElement('span');
    next.className = 'next_extension';
    next.textContent = 'Next: ';

    let days_container = document.createElement('div');
    days_container.className = 'extension-days-container';

    let next_days = document.createElement('span');
    next_days.className = 'days_extension';
    next_days.textContent = '3 '; //should be implemented dynamically

    let text_days = document.createElement('span');
    text_days.className = 'text_days_extension';
    text_days.textContent = 'days';

    days_container.appendChild(next);
    days_container.appendChild(next_days);
    days_container.appendChild(text_days);

    next_container.appendChild(days_container);
    streak_container.appendChild(next_container);

    let bottom_streak_container = document.createElement('div');
    bottom_streak_container.className = "bottom_streak_container";

    let day_icon_wrapper = document.createElement('div');
    day_icon_wrapper.className = "day_icon_wrapper";

    let day_icon_container3 = document.createElement('div');
    day_icon_container3.className = "day_icon_container";

    let day_icon_container7 = document.createElement('div');
    day_icon_container7.className = "day_icon_container";

    let day_icon3 = document.createElement('img');
    day_icon3.src = 'icons/trophy.png';
    day_icon3.className = "trophy_extension";

    let day_num3 = document.createElement('span');
    day_num3.className = 'day_num_extension';
    day_num3.textContent = "3d";

    day_icon_container3.appendChild(day_icon3);
    day_icon_container3.appendChild(day_num3);

    let day_icon7 = document.createElement('img');
    day_icon7.src = 'icons/trophy.png';
    day_icon7.className = "trophy_extension";

    let day_num7 = document.createElement('span');
    day_num7.className = 'day_num_extension';
    day_num7.textContent = "7d";

    day_icon_container7.appendChild(day_icon7);
    day_icon_container7.appendChild(day_num7);

    let day_icon_container10 = document.createElement('div');
    day_icon_container10.className = "day_icon_container";

    let day_icon10 = document.createElement('img');
    day_icon10.src = 'icons/star.png';
    day_icon10.className = "trophy_extension";

    let day_num10 = document.createElement('span');
    day_num10.className = 'day_num_extension';
    day_num10.textContent = "10d";

    day_icon_container10.appendChild(day_icon10);
    day_icon_container10.appendChild(day_num10);

    let day_icon_container14 = document.createElement('div');
    day_icon_container14.className = "day_icon_container";

    let day_icon14 = document.createElement('img');
    day_icon14.src = 'icons/target.png';
    day_icon14.className = "trophy_extension";

    let day_num14 = document.createElement('span');
    day_num14.className = 'day_num_extension';
    day_num14.textContent = "14d";

    day_icon_container14.appendChild(day_icon14);
    day_icon_container14.appendChild(day_num14);

    let day_icon_container30 = document.createElement('div');
    day_icon_container30.className = "day_icon_container";

    let day_icon30 = document.createElement('img');
    day_icon30.src = 'icons/diamond.png';
    day_icon30.className = "trophy_extension";

    let day_num30 = document.createElement('span');
    day_num30.className = 'day_num_extension';
    day_num30.textContent = "30d";

    day_icon_container30.appendChild(day_icon30);
    day_icon_container30.appendChild(day_num30);

    day_icon_wrapper.appendChild(day_icon_container3);
    day_icon_wrapper.appendChild(day_icon_container7);
    day_icon_wrapper.appendChild(day_icon_container10);
    day_icon_wrapper.appendChild(day_icon_container14);
    day_icon_wrapper.appendChild(day_icon_container30);

    let container_wrapper = document.createElement('div');
    container_wrapper.className = 'extension_container_wrapper';

    let bar_text_wrapper = document.createElement('div');
    bar_text_wrapper.className = 'bar_text_wrapper';

    let streak_bar_container = document.createElement('div');
    streak_bar_container.className = 'streak_bar_container';

    let streak_bar = document.createElement('div');
    streak_bar.className = 'streak_bar';

    streak_bar_container.appendChild(streak_bar);

    let to_num_container = document.createElement('div');
    to_num_container.className = 'to_num_container';

    let num_days = document.createElement('span');
    num_days.className = 'extension_num_days';
    num_days.textContent = '3';

    let to_go = document.createElement('span');
    to_go.className = 'extension_to_go';
    to_go.textContent = 'days to go';

    to_num_container.appendChild(num_days);
    to_num_container.appendChild(to_go);

    bar_text_wrapper.appendChild(streak_bar_container);
    bar_text_wrapper.appendChild(to_num_container);

    container_wrapper.appendChild(day_icon_wrapper);
    container_wrapper.appendChild(bar_text_wrapper);

    let focus_mode_wrapper = document.createElement('div');
    focus_mode_wrapper.className = "focus_mode_wrapper";

    let focus_header_container = document.createElement('div');
    focus_header_container.className = 'focus_header_container';

    let icon_text = document.createElement('div');
    icon_text.className = 'icon_text_focus';

    let focus_icon = document.createElement('img');
    focus_icon.className = 'focus_icon';
    focus_icon.src = 'icons/focus.png';

    let focus_text = document.createElement('span');
    focus_text.className = 'focus_text';
    focus_text.textContent = 'Focus Mode';

    icon_text.appendChild(focus_icon);
    icon_text.appendChild(focus_text);

    let focus_status = document.createElement('span');
    focus_status.className = 'focus_status';
    focus_status.textContent = 'Active'; //should be applied dynamically active/inactive

    focus_header_container.appendChild(icon_text);
    focus_header_container.appendChild(focus_status);

    let focus_body = document.createElement('div');
    focus_body.className = 'focus_body';

    let fb_wrapper = document.createElement('div');
    fb_wrapper.className = 'focuses_wrapper';

    let fb_container = document.createElement('div');
    fb_container.className = 'focuses_container';

    let fb_icon = document.createElement('img');
    fb_icon.className = 'focus_icon';
    fb_icon.src = 'icons/fb.png';

    let fb_text = document.createElement('span');
    fb_text.className = 'focus_icon_text';
    fb_text.textContent = 'Facebook';

    fb_container.appendChild(fb_icon);
    fb_container.appendChild(fb_text);

    let toggle1 = document.createElement('div');
    toggle1.className = 'toggle';

    let knob1 = document.createElement('div');
    knob1.className = 'knob';

    toggle1.appendChild(knob1);

    fb_wrapper.appendChild(fb_container);
    fb_wrapper.appendChild(toggle1);

    let ig_wrapper = document.createElement('div');
    ig_wrapper.className = 'focuses_wrapper';

    let ig_container = document.createElement('div');
    ig_container.className = 'focuses_container';

    let ig_icon = document.createElement('img');
    ig_icon.className = 'focus_icon';
    ig_icon.src = 'icons/ig.png';

    let ig_text = document.createElement('span');
    ig_text.className = 'focus_icon_text';
    ig_text.textContent = 'Instagram';

    ig_container.appendChild(ig_icon);
    ig_container.appendChild(ig_text);

    let toggle2 = document.createElement('div');
    toggle2.className = 'toggle';

    let knob2 = document.createElement('div');
    knob2.className = 'knob';

    toggle2.appendChild(knob2);

    ig_wrapper.appendChild(ig_container);
    ig_wrapper.appendChild(toggle2);

    let breakline1 = document.createElement('hr');

    let x_wrapper = document.createElement('div');
    x_wrapper.className = 'focuses_wrapper';

    let x_container = document.createElement('div');
    x_container.className = 'focuses_container';

    let x_icon = document.createElement('img');
    x_icon.className = 'focus_icon';
    x_icon.src = 'icons/x.png';

    let x_text = document.createElement('span');
    x_text.className = 'focus_icon_text';
    x_text.textContent = 'X/Twitter';

    x_container.appendChild(x_icon);
    x_container.appendChild(x_text);

    let toggle3 = document.createElement('div');
    toggle3.className = 'toggle';

    let knob3 = document.createElement('div');
    knob3.className = 'knob';

    toggle3.appendChild(knob3);

    x_wrapper.appendChild(x_container);
    x_wrapper.appendChild(toggle3);


    let breakline2 = document.createElement('hr');

    let tiktok_wrapper = document.createElement('div');
    tiktok_wrapper.className = 'focuses_wrapper';

    let tiktok_container = document.createElement('div');
    tiktok_container.className = 'focuses_container';

    let tiktok_icon = document.createElement('img');
    tiktok_icon.className = 'focus_icon';
    tiktok_icon.src = 'icons/tiktok.png';

    let tiktok_text = document.createElement('span');
    tiktok_text.className = 'focus_icon_text';
    tiktok_text.textContent = 'Tiktok';

    tiktok_container.appendChild(tiktok_icon);
    tiktok_container.appendChild(tiktok_text);

    let toggle4 = document.createElement('div');
    toggle4.className = 'toggle';

    let knob4 = document.createElement('div');
    knob4.className = 'knob';

    toggle4.appendChild(knob4);

    tiktok_wrapper.appendChild(tiktok_container);
    tiktok_wrapper.appendChild(toggle4);

    let breakline3 = document.createElement('hr');

    let yt_wrapper = document.createElement('div');
    yt_wrapper.className = 'focuses_wrapper';

    let yt_container = document.createElement('div');
    yt_container.className = 'focuses_container';

    let yt_icon = document.createElement('img');
    yt_icon.className = 'focus_icon';
    yt_icon.src = 'icons/yt.png';

    let yt_text = document.createElement('span');
    yt_text.className = 'focus_icon_text';
    yt_text.textContent = 'Youtube';

    yt_container.appendChild(yt_icon);
    yt_container.appendChild(yt_text);

    let toggle5 = document.createElement('div');
    toggle5.className = 'toggle';

    let knob5 = document.createElement('div');
    knob5.className = 'knob';

    toggle5.appendChild(knob5);

    yt_wrapper.appendChild(yt_container);
    yt_wrapper.appendChild(toggle5);

    let breakline4 = document.createElement('hr');

    focus_body.appendChild(fb_wrapper);
    focus_body.appendChild(breakline1);
    focus_body.appendChild(ig_wrapper);
    focus_body.appendChild(breakline2);
    focus_body.appendChild(x_wrapper);
    focus_body.appendChild(breakline3);
    focus_body.appendChild(tiktok_wrapper);
    focus_body.appendChild(breakline4);
    focus_body.appendChild(yt_wrapper);

    let sched_wrapper = document.createElement('div');
    sched_wrapper.className = 'sched_wrapper';

    let sched_container = document.createElement('div');
    sched_container.className = 'sched_container';

    let sched_header_container = document.createElement('div');
    sched_header_container.className = 'sched_header_container';

    let sched_icon = document.createElement('img');
    sched_icon.className = 'sched_icon_text';
    sched_icon.src = 'icons/calendar.png';

    let sched_text = document.createElement('span');
    sched_text.className = 'sched_text';
    sched_text.textContent = 'Plan sessions';

    sched_header_container.appendChild(sched_icon);
    sched_header_container.appendChild(sched_text);

    let plan_container = document.createElement('div');
    plan_container.className = 'plan_container';

    let day_planned_sched = document.createElement('span');
    day_planned_sched.className = 'day_planned_sched';
    day_planned_sched.textContent = '0'; //should be dynamic

    let planned_sched = document.createElement('span');
    planned_sched.className = 'day_planned_sched';
    planned_sched.textContent = 'scheduled';

    plan_container.appendChild(day_planned_sched);
    plan_container.appendChild(planned_sched);

    sched_container.appendChild(sched_header_container);
    sched_container.appendChild(plan_container);

    let sched_sessions = document.createElement('div');
    sched_sessions.className = 'sched_sessions_container'; //append the new created session here   

    let each_session = document.createElement('div');
    each_session.className = 'each_session_container'; //each created session will use this container

    sched_sessions.appendChild(each_session); //here too

    let sched_btns_container = document.createElement('div');
    sched_btns_container.className = 'sched_btns_container';

    let sched_btn = document.createElement('button');
    sched_btn.className = 'sched_btn';
    sched_btn.textContent = '+ Schedule Session';

    sched_btns_container.appendChild(sched_btn);

    let suggestion_wrapper = document.createElement('div');
    suggestion_wrapper.className = 'suggestion_wrapper';

    let suggestion_container = document.createElement('div');
    suggestion_container.className = 'suggestion_container';

    let ai_icon_text = document.createElement('div');
    ai_icon_text.className = 'ai_icon_text_container';

    let ai_icon = document.createElement('img');
    ai_icon.src = 'icons/ai.png';
    ai_icon.className = 'ai_icon';

    let ai_text = document.createElement('span');
    ai_text.className = 'ai_text';
    ai_text.textContent = 'AI suggestions';

    ai_icon_text.appendChild(ai_icon);
    ai_icon_text.appendChild(ai_text);

    let past_sesh = document.createElement('span');
    past_sesh.className = 'past_sesh';
    past_sesh.textContent = 'from past sessions';

    suggestion_container.appendChild(ai_icon_text);
    suggestion_container.appendChild(past_sesh);

    let lower_suggestion_container = document.createElement('div');
    lower_suggestion_container.className = 'lower_suggestion_container';

    let dummy = document.createElement('span');
    dummy.className = 'dummy';

    //each suggestion by ai will be sent in this div
    let each_suggestion = document.createElement('div');
    each_suggestion.className = 'each_suggestion';

    //btn for proceeding
    let proceed = document.createElement('button');
    proceed.className = 'proceed';
    proceed.src = 'icons/play2.png';

    lower_suggestion_container.appendChild(dummy);

    lower_suggestion_container.appendChild(each_suggestion);
    
    let detection_wrapper = document.createElement('div');
    detection_wrapper.className = 'detection_wrapper';

    let detection_container = document.createElement('div');
    detection_container.className = 'detection_container';

    let detection_icon = document.createElement('img');
    detection_icon.className = 'detection_icon';
    detection_icon.src = 'icons/idle.png';

    let detection_text = document.createElement('span');
    detection_text.className = 'detection_text';
    detection_text.textContent = 'Idle detection';

    detection_container.appendChild(detection_icon);
    detection_container.appendChild(detection_text);

    let lower_detection_container = document.createElement('div');
    lower_detection_container.className = 'lower_detection_container';

    let inner_detection_container = document.createElement('div');
    inner_detection_container.className = 'inner_detection_container';

    let glowing_green = document.createElement('div');
    glowing_green.className = 'status-circle';

    let active_container = document.createElement('div');
    active_container.className = 'active_container';

    let active_text = document.createElement('span');
    active_text.className = 'active_text';
    active_text.textContent = 'Active Now -'; // should be dynamic either active or inactive

    let active_msg = document.createElement('span');
    active_msg.className = 'active_msg';
    active_msg.textContent = ' no idle detected in the last 25 minutes. Keep it up!';

    active_container.appendChild(active_text);
    active_container.appendChild(active_msg);

    inner_detection_container.appendChild(glowing_green);
    inner_detection_container.appendChild(active_container);

    lower_detection_container.appendChild(inner_detection_container);

    let footer_container = document.createElement('div');
    footer_container.className = 'footer_container';

    let new_sesh_btn = document.createElement('button');
    new_sesh_btn.className = 'new_sesh_btn';

    let sesh_icon = document.createElement('img');
    sesh_icon.src = 'icons/play2.png';
    sesh_icon.className = 'sesh_icon';

    let sesh_text = document.createElement('span');
    sesh_text.className = 'sesh_text';
    sesh_text.textContent = 'Start new session';

    new_sesh_btn.appendChild(sesh_icon);
    new_sesh_btn.appendChild(sesh_text);

    footer_container.appendChild(new_sesh_btn);

    body_section.appendChild(extension_header_container);
    body_section.appendChild(streak_container);
    body_section.appendChild(container_wrapper);
    body_section.appendChild(focus_header_container);
    body_section.appendChild(focus_body);
    body_section.appendChild(sched_container);
    body_section.appendChild(sched_btns_container);
    body_section.appendChild(suggestion_container);
    body_section.appendChild(lower_suggestion_container);
    body_section.appendChild(detection_container);
    body_section.appendChild(lower_detection_container);
    body_section.appendChild(footer_container);

    body_wrapper.appendChild(body_section);

    document.querySelector('.compact-btn').addEventListener('click', loadCompact);
}

//saving the state
async function saveState(state) {
    console.log("[LockIn] saveState() called:", state);
  try {
    const resp = await chrome.runtime.sendMessage({ action: "saveState", state });
    console.log("[LockIn] saveState response:", resp);
    return resp;
  } catch (err) {
    console.error("[LockIn] saveState error:", err);
    throw err;
  }

}

function saveCompact(){
    compactHTML = document.querySelector(".body-wrapper").innerHTML;
}

async function loadCompact(){
    const state = await loadState();

    document.querySelector('.body-wrapper').innerHTML = compactHTML;

    // Show the expand button, remove the compact button
    document.querySelector('.expand-container').style.display = '';
    document.querySelector('.compact-container')?.remove();

    applyStateToUi(state);
    progressBar();
    initButtonHandlers();
}

//loading back up the state
async function loadState(){
    console.log("[LockIn] loadState() called");
  try {
    const resp = await chrome.runtime.sendMessage({ action: "loadState" });
    console.log("[LockIn] loadState response:", resp);
    return resp?.state ?? null;
  } catch (err) {
    console.error("[LockIn] loadState error:", err);
    throw err;
  }
}


function showConfirmOverlay(message, onConfirm, onCancel) {
    const overlay = document.getElementById('confirmation-overlay');
    const text = document.getElementById('confirmation-text');
    const yesBtn = document.getElementById('confirm-yes');
    const noBtn = document.getElementById('confirm-no');
    
    text.textContent = message;
    overlay.style.display = 'flex';
    
    const handleYes = () => {
        overlay.style.display = 'none';
        if (onConfirm) onConfirm();
        cleanup();
    };
    
    const handleNo = () => {
        overlay.style.display = 'none';
        if (onCancel) onCancel();
        cleanup();
    };
    
    const cleanup = () => {
        yesBtn.removeEventListener('click', handleYes);
        noBtn.removeEventListener('click', handleNo);
    };
    
    yesBtn.addEventListener('click', handleYes);
    noBtn.addEventListener('click', handleNo);
}

function getCurrentState(){
     return {
        sessionDuration,
        sessionBreak,
        isQuickieMode,
        hasSelection,
        originalSessionDuration,
        isOnBreak,
        pendingDuration,
        controlState,
        breakBtnText,
        streakCount,
        currentStreak,
        lastSessionDate,
     };
}

function DomReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function progressBar(){
    const bar = document.querySelector('.progress-bar');
    const percentText = document.querySelector('.progress-percent');

    if (!bar || !percentText) return;

    if (originalSessionDuration > 0){
        const elapsed = originalSessionDuration - sessionDuration;
        const pct = Math.round((elapsed / originalSessionDuration) * 100);

        bar.style.width = pct + '%';
        percentText.textContent = pct + '%';
    } else {
        //No session active - resetting the bar
        bar.style.width = '0%';
        percentText.textContent = '0%';
    }
}

// Initialize button handlers
function initButtonHandlers() {
    console.log("[LockIn] initButtonHandlers called");

    const buttons = document.querySelectorAll(
        ".fifteenMin-btn, .thirtyMin-btn, .fortyfiveMin-btn, .sixtyMin-btn"
    );

    const durations = {
        'fifteenMin-btn': 15,
        'thirtyMin-btn': 30,
        'fortyfiveMin-btn': 45,
        'sixtyMin-btn': 60
    };

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const duration = durations[btn.classList[0]];
            
            // Only block switching if session timer is running (not break timer)
            // Allow switching during break
            const isSessionRunning = timerInterval && !isOnBreak;
            
            if (isSessionRunning) {
                // Store the previously selected button to restore on "No"
                const previouslySelected = document.querySelector('.min-btn-selected');
                
                pendingDuration = { duration };
                showConfirmOverlay(
                    `Switch from current session to ${duration} minutes?`,
                    () => {
                        // User clicked Yes - switch to new time and start immediately
                        clearInterval(timerInterval);
                        timerInterval = null;
                        isOnBreak = false;
                        
                        // Update selection highlight
                        buttons.forEach(b => b.classList.remove("min-btn-selected"));
                        btn.classList.add("min-btn-selected");
                        
                        sessionDuration = duration * 60;
                        originalSessionDuration = sessionDuration;
                        updateQuickieDisplay();
                        hasSelection = true;
                        saveState(getCurrentState());
                        
                        // Immediately start the new session
                        setTimeout(() => startSession(), 0);
                    },
                    () => {
                        // User clicked No - restore previous highlight
                        buttons.forEach(b => b.classList.remove("min-btn-selected"));
                        if (previouslySelected) {
                            previouslySelected.classList.add("min-btn-selected");
                        }
                        hasSelection = true;
                        pendingDuration = null;
                    }
                );
                return;
            }
            
            // If timer not running or only break timer is running, allow selection
            buttons.forEach(b => b.classList.remove("min-btn-selected"));
            btn.classList.add("min-btn-selected");
            
            hasSelection = true;
            isQuickieMode = true;
            
            sessionDuration = duration * 60;
            originalSessionDuration = sessionDuration;
            updateQuickieDisplay();
            saveState(getCurrentState());
        });
    });
    
    document.getElementById('expand-details-btn')?.addEventListener('click', function() {
        popUp_extension(document.querySelector('.body-wrapper'));
    });
    document.querySelector('.start-btn')?.addEventListener('click', startSession);
}

// Load saved state and initialize
function applyStateToUi(state) {
    sessionDuration = state.sessionDuration;
    originalSessionDuration = state.originalSessionDuration;
    sessionBreak = state.sessionBreak;
    hasSelection = state.hasSelection;
    isOnBreak = state.isOnBreak;
    pendingDuration = state.pendingDuration;
    controlState = state.controlState ?? "start";
    breakBtnText = state.breakBtnText ?? "break";
    currentStreak = state.currentStreak ?? 0;
    streakCount = state.currentStreak ?? 0;
    lastSessionDate = state.lastSessionDate ?? "";

  if (hasSelection && sessionDuration > 0) {
        const minutes = Math.floor(sessionDuration / 60);
        const btnMap = {
            15: "fifteenMin-btn",
            30: "thirtyMin-btn",
            45: "fortyfiveMin-btn",
            60: "sixtyMin-btn"
        };

        const selectedBtnClass = btnMap[minutes];
        if (selectedBtnClass) {
            const btn = document.querySelector("." + selectedBtnClass);
            if (btn) btn.classList.add("min-btn-selected");
        }
    }

    if (controlState === "start") {
    showStartButton();
    } else if (controlState === "break_stop" || controlState === "resume") {
        showBreakStopButtons();
    } else {
        showStartButton();
    }

    if (state.isOnBreak) updateBreakDisplay();
    updateDisplay();
    progressBar();

}

// usage
document.addEventListener("DOMContentLoaded", async () => {
  const state = await loadState();

    if (state) {

        saveCompact();
        applyStateToUi(state);

        const wasRunning = (state.controlState === "break_stop" || state.controlState === "resume") && state.sessionDuration > 0;

        const elapsedTime = Math.floor((Date.now() - state.lastModified) / 1000);

        if (wasRunning && elapsedTime > 0 && (state.sessionDuration > 0 || state.sessionBreak > 0)) {
            if (state.isOnBreak) {
                state.sessionBreak = Math.max(0, state.sessionBreak - elapsedTime);

                if (state.sessionBreak <= 0) {
                    state.isOnBreak = false;
                    state.controlState = "break_stop";
                    state.breakBtnText = "break";
                }
            } else {
                state.sessionDuration = Math.max(0, state.sessionDuration - elapsedTime);
                if (state.sessionDuration <= 0) {
                    alert("Session Complete!");
                    state.controlState = "start";
                    state.hasSelection = false;
                    state.isQuickieMode = false;
                }
            }
            await saveState(state);

            applyStateToUi(state);
        }

        // Restart the active timer if session was running
        if (wasRunning && !timerInterval) {
            if (isOnBreak && state.sessionBreak > 0) {
                // Restart break interval
                timerInterval = setInterval(() => {
                    sessionBreak--;
                    if (sessionBreak <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        isOnBreak = false;
                        breakBtnText = "break";

                        updateQuickieDisplay();
                        progressBar();
                        showBreakStopButtons();

                        alert("Break ended! Resuming session...");
                        saveState(getCurrentState());
                    }
                    updateBreakDisplay();
                    progressBar();
                }, 1000);
            } else if (!isOnBreak && state.sessionDuration > 0) {
                // Restart session interval
                timerInterval = setInterval(() => {
                    sessionDuration--;
                    if (sessionDuration <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        alert("Session complete!");
                        resetToDefault();
                    }
                    updateDisplayBasedOnState();
                    progressBar();
                }, 1000);
                showBreakStopButtons();
            }
            saveState(getCurrentState());
        }
    }
    initButtonHandlers();
});

function getElapsedTime(state) {
    return Math.floor((Date.now() - state.lastModified) / 1000);
}

//helper function to display the continue textContent during break
function applyBreakBtnText(){
    const breakBtn = document.getElementById('break-btn');
    if(!breakBtn) return;

    const text = breakBtnText === "continue" ? "Continue" : "Break";

    breakBtn.innerHTML = `<img src="icons/break.png" class="stop-break-icon"> ${text}`;
}


function updateDisplay() {
    const output = document.querySelector('.today-goal-wrapper');
    output.innerHTML = "";

    let goal_wrapper = document.createElement('div');
    goal_wrapper.className = "today-goal-container";

    let today_container = document.createElement('div');
    today_container.className = "today-container";

    let today_text = document.createElement('span');
    today_text.className = "today-text";
    today_text.textContent = "CURRENT";

    let today_time = document.createElement('span');
    today_time.className = "today-time";
    today_time.textContent = formatTime(sessionDuration);

    today_container.appendChild(today_text);
    today_container.appendChild(today_time);

    let goal_container = document.createElement('div');
    goal_container.className = "goal-container";

    let goal_text = document.createElement('span');
    goal_text.className = "goal-text";
    goal_text.textContent = "DAILY GOAL";

    let goal_time = document.createElement('span');
    goal_time.className = "goal-time";

    goal_container.appendChild(goal_text);
    goal_container.appendChild(goal_time);

    goal_wrapper.appendChild(today_container);
    goal_wrapper.appendChild(goal_container);

    output.appendChild(goal_wrapper);
}

function updateQuickieDisplay() {
    const output = document.querySelector('.today-time');
    output.innerHTML = "";

    let quickie_time = document.createElement('span');
    quickie_time.className = "quickie-time";
    quickie_time.textContent = formatTime(sessionDuration);

    output.appendChild(quickie_time);
}

function updateBreakDisplay() {
    const output = document.querySelector('.dynamic-motivation-text');
    output.innerHTML = "";

    let break_wrapper = document.createElement('div');
    break_wrapper.className = "break-container";

    let break_text = document.createElement('span');
    break_text.className = "break-text";
    break_text.textContent = "REST: ";

    let break_time = document.createElement('span');
    break_time.className = "break-time";
    break_time.textContent = formatTime(sessionBreak);

    break_wrapper.appendChild(break_text);
    break_wrapper.appendChild(break_time);

    output.appendChild(break_wrapper);
}

function formatTime(seconds) {
    const isTimerActive = timerInterval || controlState === "break_stop" || controlState === "resume";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (isTimerActive) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${hours}h ${minutes}m`;
}

function startSession() {
    if (sessionDuration <= 0) return;
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        sessionDuration--;
        if (sessionDuration <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            if (isOnBreak) {
                // Break ended, resume original session
                isOnBreak = false;
                updateDisplay(); // Back to normal quickie display
                showStartButton();
                alert("Break ended! Resuming session...");
            } else {
                // Session completed
                showStartButton();
                alert("Session complete!");
                resetToDefault();
            }
        }
        updateDisplayBasedOnState();
        progressBar();
    }, 1000);
    
    showBreakStopButtons();
    saveState(getCurrentState());
}

function showBreakStopButtons() {
    controlState = "break_stop";

    const container = document.querySelector('.start-session-container');
    container.innerHTML = `
        <div class="break_stop_container" id="break_stop_id">
            <div class="btns-stop-break">
                <button class="break-btn" id="break-btn">
                    <img src="icons/break.png" class="stop-break-icon">
                    Break
                </button>
            </div>

            <div class="btns-stop-break">
                <button class="stop-btn" id="stop-btn">
                    <img src="icons/stop.png" class="stop-break-icon">
                    Stop
                </button>
            </div>
        </div>
    `;
    const breakBtn = document.getElementById('break-btn');

    breakBtn.addEventListener('click', () => {
        if (breakBtnText === "continue") {
            resumeSession();
        } else {
            takeBreak();
        }
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
        stopSession();
    });

    applyBreakBtnText();
    saveState(getCurrentState());

}

function showStartButton() {
    controlState = "start";

    const container = document.querySelector('.start-session-container');
    container.innerHTML = `
        <button class="start-btn">
            <img src="icons/play2.png" class="start-icon">
            Start Session
        </button>
    `;
    const startBtn = document.querySelector('.start-btn');
    startBtn.dataset.lockinStartHandler = "1";
    startBtn.addEventListener('click', startSession);

    saveState(getCurrentState());
}

//updates the display and works on the functionality of the break
function takeBreak() {
    clearInterval(timerInterval);
    timerInterval = null;
    isOnBreak = true;

    // Start break timer (5 minutes)
    sessionBreak = 5 * 60;
    breakBtnText = "continue";

    updateBreakDisplay();
    progressBar();

    timerInterval = setInterval(() => {
        sessionBreak--; // decrement break, not sessionDuration

        if (sessionBreak <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isOnBreak = false;
            breakBtnText = "break";

            // Resume Quickie from saved time
            updateQuickieDisplay();
            progressBar();
            showBreakStopButtons();

            alert("Break ended! Resuming session...");
        }
        updateBreakDisplay();
    }, 1000);

    showBreakStopButtons();

    // Change Break button to Continue
    const breakBtn = document.getElementById('break-btn');
    if (breakBtn) {
        breakBtn.innerHTML = `<img src="icons/break.png" class="stop-break-icon"> Continue`;
        breakBtn.onclick = resumeSession;
    }
    saveState(getCurrentState());
}

//Stops the session
function stopSession() {
    clearInterval(timerInterval);

    hasSelection = false;
    timerInterval = null;
    sessionDuration = 0;
    isQuickieMode = false;
    isOnBreak = false;
    originalSessionDuration = 0;
    breakBtnText = "break";

    const output = document.querySelector('.today-time');
    output.innerHTML = "0h 0m";

    const mascot_text = document.querySelector('.dynamic-motivation-text');

    mascot_text.innerHTML = "See you on your next session to Lock in.";

    showStartButton();
    progressBar();
    
    const buttons = document.querySelectorAll(
        ".fifteenMin-btn, .thirtyMin-btn, .fortyfiveMin-btn, .sixtyMin-btn"
    );
    console.log("Buttons found:", buttons.length);

    buttons.forEach(btn => btn.classList.remove("min-btn-selected"));

    saveState(getCurrentState())
    .then(() => {
        console.log("saveState called successfully");
    })
    .catch(err => {
        console.error("saveState failed:", err);
    });
}

//continues the session from break
function resumeSession() {
    const output = document.querySelector('.dynamic-motivation-text');
    output.innerHTML = "";

    let continue_text = document.createElement('span');
    continue_text.textContent = "Let's get back to work and perform better!"; 
    
    output.appendChild(continue_text);

    clearInterval(timerInterval);
    timerInterval = null;

    controlState = "break_stop";
    breakBtnText = "break";
    isOnBreak = false;
    // sessionDuration is already set to originalSessionDuration in takeBreak when break ends
    // But if user clicks continue during break, we need to resume from remaining break time
    // Actually, let's just resume the original session (not the break)
    
    updateQuickieDisplay(); // Back to quickie display
    progressBar();
    showBreakStopButtons(); // Reset buttons to break and stop
    // Change the continue button back to a break button
    
    timerInterval = setInterval(() => {
        sessionDuration--;
        if (sessionDuration <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            resetToDefault();
            alert("Session complete!");
            return;
        }

        updateQuickieDisplay();
        saveState(getCurrentState());
    }, 1000);

    saveState(getCurrentState());
}

//updates the display based off the conditions
function updateDisplayBasedOnState() {
    if (isOnBreak) {
        updateBreakDisplay();
    } else if (isQuickieMode) {
        updateQuickieDisplay();
    } else {
        updateDisplay();
    }
}

//resets the states to default
function resetToDefault() {
    hasSelection = false;
    isQuickieMode = false;
    isOnBreak = false;
    sessionDuration = 0;
    originalSessionDuration = 0;
    controlState = "start";
    breakBtnText = "break";

    updateDisplay();
    showStartButton();
    progressBar();
    
    // Remove selection from buttons
    const buttons = document.querySelectorAll(
        ".fifteenMin-btn, .thirtyMin-btn, .fortyfiveMin-btn, .sixtyMin-btn"
    );
    buttons.forEach(btn => btn.classList.remove("min-btn-selected"));

    saveState(getCurrentState());
}

function trackingStreak(){

}

//updating the UI
function updateStreak() {
    const streakCountEl = document.querySelector('.streak-count');
    if (!streakCountEl) return;

    const daysToGoEl = document.querySelector('.extension_num_days');
    if (!daysToGoEl) return;

    const nextDaysEl = document.querySelector('.days_extension');
    if (!nextDaysEl) return;

    const streakBar = document.querySelector('.streak_bar');
    if(!streakBar) return;
    
    const highestMilestone = milestones[milestones.length - 1].days;
    if (currentStreak > highestMilestone) {
        milestones = updateMilestone();
    }

    const nextMileStone = milestones.find(m => m.days > currentStreak);
    if (!nextMileStone) {
        streakBar.style.width = '100%';
        nextDaysEl.textContent = '0';
        daysToGoEl.textContent = '0';
        streakCountEl.textContent = currentStreak;
        return;
    }    
    const prevMileStone = milestones.filter(m => m.days < currentStreak).pop();
    if (!prevMileStone) {
        streakBar.style.width = '0%';
        return;
    }

    const daysToGo = nextMileStone.days - currentStreak;
    nextDaysEl.textContent = daysToGo;
    daysToGoEl.textContent = daysToGo;
    streakCountEl.textContent = currentStreak;

    const progressStreak = currentStreak - prevMileStone.days;
    const wideMilestone = nextMileStone.days - prevMileStone.days;
    const pct = (progressStreak / wideMilestone) * 100;
    streakBar.style.width = pct + '%';
}

function updateMilestone(){
    return [
        { days: 40,  icon: 'icons/trophy.png',  className: 'trophy_extension', textClass: 'day_num_extension' },
        { days: 67,  icon: 'icons/trophy.png',  className: 'trophy_extension', textClass: 'day_num_extension' },
        { days: 80, icon: 'icons/star.png',    className: 'star_extension',   textClass: 'day_num_extension_other' },
        { days: 95, icon: 'icons/target.png',  className: 'target_extension', textClass: 'day_num_extension_other' },
        { days: 120, icon: 'icons/diamond.png', className: 'target_extension', textClass: 'day_num_extension_other' },
    ];

}
