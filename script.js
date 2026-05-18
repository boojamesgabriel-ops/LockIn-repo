let sessionDuration = 0;
let timerInterval = null;

function popUp_extension(quick_session){
    quick_session.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.fifteenMin-btn').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        sessionDuration = 15 * 60;
        updateDisplay();
    });
    document.querySelector('.thirtyMin-btn').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        sessionDuration = 30 * 60;
        updateDisplay();
    });
    document.querySelector('.fortyfiveMin-btn').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        sessionDuration = 45 * 60;
        updateDisplay();
    });
    document.querySelector('.sixtyMin-btn').addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        sessionDuration = 60 * 60;
        updateDisplay();
    });
    document.getElementById('view-details-btn').addEventListener('click', function() {
        popUp_extension(document.querySelector('.quick-sessions-container'));
    });
    document.querySelector('.start-btn').addEventListener('click', startSession);
});

function updateDisplay() {
    const output = document.querySelector('.session-output');
    output.innerHTML = "";

    let goal_wrapper = document.createElement('div');
    goal_wrapper.className = "today-goal-container";

    let today_container = document.createElement('div');
    today_container.className = "today-container";

    let today_text = document.createElement('span');
    today_text.className = "today-text";
    today_text.textContent = "TODAY";

    let today_time = document.createElement('span');
    today_time.className = "today-time";
    today_time.textContent = formatTime(sessionDuration);

    today_container.appendChild(today_text);
    today_container.appendChild(today_time);

    let goal_container = document.createElement('div');
    goal_container.className = "goal-container";

    let goal_text = document.createElement('span');
    goal_text.className = "goal-text";
    goal_text.textContent = "GOAL";

    let goal_time = document.createElement('span');
    goal_time.className = "goal-time";
    goal_time.textContent = formatTime(sessionDuration);

    goal_container.appendChild(goal_text);
    goal_container.appendChild(goal_time);

    goal_wrapper.appendChild(today_container);
    goal_wrapper.appendChild(goal_container);

    output.appendChild(goal_wrapper);
}

function formatTime(seconds) {
    if (timerInterval) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
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
            showStartButton();
            alert("Session complete!");
        }
        updateDisplay();
    }, 1000);
    
    showBreakStopButtons();
}

function showBreakStopButtons() {
    const container = document.querySelector('.start-session-container');
    container.innerHTML = `
        <button class="break-btn" id="break-btn">Break</button>
        <button class="stop-btn" id="stop-btn">Stop</button>
    `;
    document.getElementById('break-btn').addEventListener('click', takeBreak);
    document.getElementById('stop-btn').addEventListener('click', stopSession);
}

function showStartButton() {
    const container = document.querySelector('.start-session-container');
    container.innerHTML = `
        <button class="start-btn">
            <img src="icons/play2.png" class="start-icon">
            Start Session
        </button>
    `;
    document.querySelector('.start-btn').addEventListener('click', startSession);
}

function takeBreak() {
    clearInterval(timerInterval);
    timerInterval = null;
    showStartButton();
}

function stopSession() {
    clearInterval(timerInterval);
    timerInterval = null;
    sessionDuration = 0;
    updateDisplay();
    showStartButton();
}

function quickie_fifteen(container){
    clearInterval(timerInterval);
    timerInterval = null;
    sessionDuration = 15 * 60;
    updateDisplay();
}

function quickie_thirty(container){
    clearInterval(timerInterval);
    timerInterval = null;
    sessionDuration = 30 * 60;
    updateDisplay();
}

function quickie_fortyfive(container){
    clearInterval(timerInterval);
    timerInterval = null;
    sessionDuration = 45 * 60;
    updateDisplay();
}

function quickie_sixty(container){
    clearInterval(timerInterval);
    timerInterval = null;
    sessionDuration = 60 * 60;
    updateDisplay();
}