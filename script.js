
document.addEventListener("DOMContentLoaded", function () {
  const enterButton = document.getElementById("enter-museum");
  const intro = document.getElementById("intro");
  const museum = document.getElementById("museum");

  if (!enterButton || !intro || !museum) {
    alert("Museum error: Please check the IDs in index.html.");
    return;
  }

  enterButton.addEventListener("click", function () {
    museum.classList.add("ready");
    intro.classList.add("leaving");

    setTimeout(function () {
      intro.style.display = "none";
    }, 1200);
  });

  function updateTimer() {
    const start = new Date("2026-04-19T00:00:00").getTime();
    const now = Date.now();
    const difference = Math.max(0, now - start);

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    const elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds")
    };

    if (elements.days) elements.days.textContent = days;
    if (elements.hours) elements.hours.textContent = String(hours).padStart(2, "0");
    if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, "0");
    if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
});
