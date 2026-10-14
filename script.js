const intro = document.getElementById("intro");
const museum = document.getElementById("museum");
const enterButton = document.getElementById("enter-museum");

const musicButton = document.getElementById("music-toggle");
const music = document.getElementById("background-music");

const letterButton = document.getElementById("open-letter");
const letterContent = document.getElementById("letter-content");

const revealButton = document.getElementById("reveal-button");
const revealContent = document.getElementById("reveal-content");

const memoryDialog = document.getElementById("memory-dialog");
const closeMemory = document.getElementById("close-memory");
const dialogTitle = document.getElementById("dialog-title");
const dialogMessage = document.getElementById("dialog-message");

// Reveal the museum entrance.
enterButton.addEventListener("click", () => {
  museum.classList.add("ready");
  intro.classList.add("leaving");

  // Allow the entrance animation to finish before removing it.
  window.setTimeout(() => {
    intro.style.display = "none";
  }, 1200);
});

// Relationship timer: 19 April 2026.
const startDate = new Date(2026, 3, 19, 0, 0, 0);

function updateTimer() {
  const now = new Date();
  let elapsed = Math.max(0, now.getTime() - startDate.getTime());

  const secondsTotal = Math.floor(elapsed / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  document.getElementById("days").textContent =
    String(days).padStart(3, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateTimer();
window.setInterval(updateTimer, 1000);

// Background music toggle.
// Browsers require the visitor to press the button before music can play.
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.innerHTML = "♫ <span>Music on</span>";
      musicButton.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicButton.innerHTML = "♫ <span>Add music.mp3</span>";
      console.error("Music could not play:", error);
    }
  } else {
    music.pause();
    musicButton.innerHTML = "♫ <span>Music off</span>";
    musicButton.setAttribute("aria-pressed", "false");
  }
});

// Open and close the personal letter.
letterButton.addEventListener("click", () => {
  const isHidden = letterContent.hidden;

  letterContent.hidden = !isHidden;
  letterButton.innerHTML = isHidden
    ? "SEAL THE LETTER <span>↗</span>"
    : "UNSEAL THE LETTER <span>↗</span>";

  if (isHidden) {
    letterContent.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
});

// Final cinematic reveal.
revealButton.addEventListener("click", () => {
  const isHidden = revealContent.hidden;

  revealContent.hidden = !isHidden;
  revealButton.innerHTML = isHidden
    ? "<span>HIDE THE SECRET</span><span>↙</span>"
    : "<span>REVEAL THE LAST SECRET</span><span>↗</span>";

  if (isHidden) {
    revealContent.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
});

// Interactive memory exhibits.
document.querySelectorAll(".memory-card").forEach((card) => {
  card.addEventListener("click", () => {
    dialogTitle.textContent = card.dataset.title || "A memory";
    dialogMessage.textContent =
      card.dataset.message || "A moment worth keeping forever.";

    if (typeof memoryDialog.showModal === "function") {
      memoryDialog.showModal();
    } else {
      alert(
        dialogTitle.textContent + "\n\n" +
        dialogMessage.textContent
      );
    }
  });
});

closeMemory.addEventListener("click", () => {
  memoryDialog.close();
});

// Clicking the dark area outside the memory popup closes it.
memoryDialog.addEventListener("click", (event) => {
  if (event.target === memoryDialog) {
    memoryDialog.close();
  }
});

// Gentle reveal as sections enter view.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".chapter, .quote-section, .letter-chapter, .final-chapter")
    .forEach((section) => revealObserver.observe(section));
}
