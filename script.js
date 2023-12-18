// Get references to HTML elements
const displayElement = document.querySelector('.display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

// Variables to store time values
let startTime;
let isRunning = false;
let interval;
let lapTimes = [];

// Event listeners for buttons
startStopButton.addEventListener('click', toggleStartStop);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

// Function to start or stop the stopwatch
function toggleStartStop() {
    if (isRunning) {
        // Stop the stopwatch
        clearInterval(interval);
        isRunning = false;
        startStopButton.textContent = 'start';
    } else {
        // Start the stopwatch
        startTime = Date.now();
        interval = setInterval(updateDisplay, 1000);
        isRunning = true;
        startStopButton.textContent = 'stop';
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    displayElement.textContent = '00:00:00';
    startStopButton.textContent = 'start';
    lapTimes = [];
    updateLapTimes();
}

// Function to record lap time
function recordLap() {
    console.log('Lap button clicked');
    if (isRunning) {
        const currentTime = Date.now();
        const lapTime = new Date(currentTime - startTime);
        lapTimes.push(formatTime(lapTime));
        updateLapTimes();
    }
}

// Function to update the display with elapsed time
function updateDisplay() {
    const currentTime = Date.now();
    const elapsedTime = new Date(currentTime - startTime);
    displayElement.textContent = formatTime(elapsedTime);
}

// Function to format time as HH:MM:SS
function formatTime(time) {
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Get a reference to the lap times container in your HTML
const lapTimesContainer = document.getElementById('lapTimesContainer');

// Function to update the lap times display
function updateLapTimes() {
    // Clear previous lap times
    lapTimesContainer.innerHTML = '';

    // Display lap times in an unordered list
    const ul = document.createElement('ul');
    lapTimes.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lapTime}`;
        ul.appendChild(li);
    });

    lapTimesContainer.appendChild(ul);
}
