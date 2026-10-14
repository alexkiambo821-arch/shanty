
const startDate = new Date(2026, 3, 19, 0, 0, 0);

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateTimer() {
  const now = new Date();
  const difference = now.getTime() - startDate.getTime();

  if (difference < 0) {
    daysElement.textContent = "000";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysElement.textContent = String(days).padStart(3, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);

// Music toggle
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "♫ Pause our music";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicToggle.textContent = "Music unavailable — add music.mp3";
      musicToggle.setAttribute("aria-pressed", "false");
    }
  } else {
    music.pause();
    musicToggle.textContent = "♫ Play our music";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

