# LockIn Streak Tracker

A beginner-friendly streak-tracking system for the LockIn browser extension. It tracks a user's current streak, calculates progress toward milestone goals, and updates the popup UI with milestone progress, days remaining, and a visual progress bar.

## Overview

LockIn helps users stay consistent by showing their current productivity streak and progress toward the next milestone. The streak tracker uses a configurable `milestones` array, compares it with `currentStreak`, and updates the popup DOM with:

- The current streak count.
- The number of days left until the next milestone.
- A progress bar that fills as the user moves between milestones.
- Milestone icons and labels for visual feedback.

Milestones are configurable and can be refreshed dynamically. The current implementation starts with early milestones such as 3, 7, 10, 14, and 30 days, then uses `updateMilestone()` to provide a later milestone set such as 40, 67, 80, 95, and 120 days.

## Features

- Dynamic milestone tracking through the `milestones` array in `extension/script.js`.
- Automatic milestone refresh with `updateMilestone()` when the current streak passes the highest configured milestone.
- Progress bar calculation with `updateStreak()`.
- DOM updates for `.streak-count`, `.days_extension`, `.extension_num_days`, and `.streak_bar`.
- Chrome extension state persistence through `chrome.storage.local` in `extension/background.js`.
- Popup-based UI for streaks, quick sessions, focus mode, and daily progress.

## Installation & Setup

### Clone the repository

```bash
git clone <repo-url>
cd LockIn-repo
```

### Run the browser extension locally

The streak tracker lives in the `extension/` folder and does not require npm dependencies.

1. Open Chrome or a Chromium-based browser.
2. Go to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `extension/` folder from this repository.
6. Open the LockIn extension popup.

### Optional backend setup

The repository also includes a TypeScript backend in `backend/`.

```bash
cd backend
npm install
npm run devStart
```

The backend package currently declares the `devStart` script instead of a root-level `npm start`.

## Usage

The extension popup loads `extension/script.js` from `extension/popup.html`:

```html
<link rel="stylesheet" type="text/css" href="popup.css">

<span class="streak-header">
  <img src="icons/fire.png" class="streak-icon">
  <span class="streak-count">0</span>
</span>

<script src="script.js"></script>
```

The detailed streak UI is created by `popUp_extension()`. It adds the milestone progress elements that `updateStreak()` expects:

```html
<span class="days_extension">3</span>
<span class="extension_num_days">3</span>
<div class="streak_bar"></div>
```

Use `updateStreak()` after `currentStreak` changes or after the expanded streak UI has been rendered:

```js
currentStreak = 10;

// Refreshes the visible streak count, days remaining, and progress bar.
updateStreak();
```

`updateStreak()` is responsible for finding the next milestone, finding the previous milestone, calculating the percentage progress between them, and writing the result to the DOM. `updateMilestone()` returns the next set of milestones when the streak grows beyond the highest configured value.

## Milestone Configuration

Milestones are plain JavaScript objects stored in the `milestones` array:

```js
const milestones = [
  { days: 3, icon: 'icons/trophy.png', className: 'trophy_extension', textClass: 'day_num_extension' },
  { days: 7, icon: 'icons/trophy.png', className: 'trophy_extension', textClass: 'day_num_extension' },
  { days: 10, icon: 'icons/star.png', className: 'star_extension', textClass: 'day_num_extension_other' },
  { days: 14, icon: 'icons/target.png', className: 'target_extension', textClass: 'day_num_extension_other' },
  { days: 30, icon: 'icons/diamond.png', className: 'target_extension', textClass: 'day_num_extension_other' },
];
```

Each milestone can define:

- `days`: the streak day target.
- `icon`: the icon shown for the milestone.
- `className`: the CSS class used for the icon.
- `textClass`: the CSS class used for the milestone text.

Example milestone object:

```js
{ days: 10, icon: 'icons/star.png', className: 'star_extension', textClass: 'day_num_extension_other' }
```

Developers can add, remove, or extend milestones to match the desired streak system:

```js
function updateMilestone() {
  return [
    { days: 40, icon: 'icons/trophy.png', className: 'trophy_extension', textClass: 'day_num_extension' },
    { days: 67, icon: 'icons/trophy.png', className: 'trophy_extension', textClass: 'day_num_extension' },
    { days: 80, icon: 'icons/star.png', className: 'star_extension', textClass: 'day_num_extension_other' },
    { days: 95, icon: 'icons/target.png', className: 'target_extension', textClass: 'day_num_extension_other' },
    { days: 120, icon: 'icons/diamond.png', className: 'target_extension', textClass: 'day_num_extension_other' },
  ];
}
```

## Known Issues / Edge Cases

- Streaks 1-2: `prevMileStone` is undefined because the first configured milestone is 3 days. Use a fallback such as `{ days: 0 }` if progress should start at day 0.
- Streak equal to the last milestone: the progress bar should show `100%` and days remaining should show `0`.
- Milestone refresh: `updateStreak()` currently reassigns `milestones` after calling `updateMilestone()`. Because `milestones` is declared with `const`, this can throw when `currentStreak` exceeds the highest milestone. Change it to `let` or refactor the refresh logic before relying on dynamic milestone replacement.
- Global state: refreshing or replacing the global milestone list can be brittle if other code expects the original milestones to remain available.
- DOM timing: `updateStreak()` requires the expanded streak elements to exist. If `.extension_num_days`, `.days_extension`, or `.streak_bar` are missing, it exits early.

## Future Improvements

- Add streak persistence with a clearer storage model, such as `localStorage`, `chrome.storage.local`, or a database-backed API.
- Support multiple users and per-user milestone progress.
- Add visual themes for different milestone types.
- Make milestone sets fully configurable from a settings screen or JSON file.
- Add tests for milestone boundaries, progress bar percentages, and DOM updates.
- Refactor streak logic into pure helper functions so it can be tested without the browser DOM.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make a focused change with clear naming and comments where helpful.
4. Test the extension manually in Chrome using **Load unpacked**.
5. Open a pull request with a short description of what changed and why.

Please use issues for bug reports, edge cases, and feature suggestions. Include reproduction steps when reporting UI or streak calculation bugs.

## License

This project currently uses the ISC license as declared in `backend/package.json`. If a root `LICENSE` file is added later, treat that file as the source of truth.
