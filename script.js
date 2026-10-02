/**
 * VEDA TECHNOLOGY - COUNTDOWN TIMER
 * Implementation based on requirements:
 * 1. JavaScript Date math
 * 2. setInterval with 1000ms cadence
 * 3. Dynamic DOM updates
 * 4. Configurable target date
 * 5. Completion message & clearInterval cleanup
 */

// ----------------------------------------------------
// 1. CONFIGURATION
// Configure your target countdown date here:
// ----------------------------------------------------
let TARGET_DATE = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000); // 10 days, 14 hours from now

// Global interval holder for clear/reset
let timerInterval = null;

// DOM Element Selectors
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const targetDateDisplay = document.getElementById('target-date-display');
const timerGrid = document.getElementById('timer-grid');
const completionBox = document.getElementById('completion-box');
const liveIndicator = document.getElementById('live-indicator');

// Button controls for testing
const btnQuickTest = document.getElementById('btn-quick-test');
const btnFuture = document.getElementById('btn-future');

/**
 * Formats single-digit numbers with a leading zero (e.g., 7 -> "07")
 */
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

/**
 * Updates the target date text header
 */
function updateTargetHeader() {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  targetDateDisplay.textContent = `Target: ${TARGET_DATE.toLocaleDateString(undefined, options)}`;
}

/**
 * Core Countdown Function
 * Calculates remaining time via Date math and updates DOM elements.
 */
function updateCountdown() {
  const now = new Date().getTime();
  const timeDifference = TARGET_DATE.getTime() - now;

  // Check if countdown has reached zero or expired
  if (timeDifference <= 0) {
    // 1. Stop the interval to prevent unnecessary CPU usage
    clearInterval(timerInterval);
    timerInterval = null;

    // 2. Set all counter units to zero
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';

    // 3. Update the UI to show completion state
    timerGrid.style.opacity = '0.4';
    completionBox.classList.add('show');
    liveIndicator.innerHTML = '<span style="color:#f87171;">●</span> Finished';
    liveIndicator.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    liveIndicator.style.background = 'rgba(239, 68, 68, 0.12)';
    liveIndicator.style.color = '#ef4444';
    return;
  }

  // Unit definitions in milliseconds
  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = 1000 * 60;
  const MS_PER_HOUR = 1000 * 60 * 60;
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Breakdown mathematics using floor and remainder modulo
  const days = Math.floor(timeDifference / MS_PER_DAY);
  const hours = Math.floor((timeDifference % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((timeDifference % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((timeDifference % MS_PER_MINUTE) / MS_PER_SECOND);

  // Update DOM with padded strings
  daysEl.textContent = padZero(days);
  hoursEl.textContent = padZero(hours);
  minutesEl.textContent = padZero(minutes);
  secondsEl.textContent = padZero(seconds);
}

/**
 * Initializes or resets the countdown timer loop
 */
function startCountdown() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Reset UI elements to active state
  timerGrid.style.opacity = '1';
  completionBox.classList.remove('show');
  liveIndicator.innerHTML = '<span class="pulse-dot"></span> Live';
  liveIndicator.style.borderColor = 'rgba(34, 197, 94, 0.3)';
  liveIndicator.style.background = 'rgba(34, 197, 94, 0.12)';
  liveIndicator.style.color = '#22c55e';

  updateTargetHeader();

  // Run once immediately to avoid 1-second blank flash
  updateCountdown();

  // Schedule to execute every 1,000 milliseconds (1 second)
  timerInterval = setInterval(updateCountdown, 1000);
}

// ----------------------------------------------------
// Event Listeners for Testing / Controls
// ----------------------------------------------------

// Demo 1: Quick 10-second countdown to verify the completion state
btnQuickTest.addEventListener('click', () => {
  TARGET_DATE = new Date(Date.now() + 10 * 1000);
  startCountdown();
});

// Demo 2: Standard target set to 30 days ahead
btnFuture.addEventListener('click', () => {
  TARGET_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  startCountdown();
});

// Run automatically on initial page load
startCountdown();