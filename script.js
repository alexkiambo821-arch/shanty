
document.addEventListener("DOMContentLoaded", function () {
  const get = id => document.getElementById(id);

  const intro = get("intro");
  const museum = get("museum");
  const enterButton = get("enter-museum");

  if (enterButton && intro && museum) {
    enterButton.onclick = function () {
      museum.classList.add("ready");
      intro.classList.add("leaving");

      const music = get("background-music");
      if (music) {
        music.volume = 0.6;
        music.play().catch(() => {});
      }

      setTimeout(() => {
        intro.style.display = "none";
      }, 1200);
    };
  }

  function updateTimer() {
    const start = new Date("2026-04-19T00:00:00").getTime();
    const diff = Math.max(0, Date.now() - start);

    const values = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      minutes: Math.floor(diff / 60000) % 60,
      seconds: Math.floor(diff / 1000) % 60
    };

    Object.entries(values).forEach(([id, value]) => {
      const el = get(id);
      if (el) el.textContent =
        id === "days" ? value : String(value).padStart(2, "0");
    });
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  const music = get("background-music");
  const musicToggle = get("music-toggle");

  if (musicToggle && music) {
    musicToggle.onclick = async function () {
      if (music.paused) {
        try {
          await music.play();
          musicToggle.textContent = "♫ Music On";
        } catch (e) {
          alert("Please check that music.mp3 is uploaded to your repository.");
        }
      } else {
        music.pause();
        musicToggle.textContent = "♫ Music Off";
      }
    };
  }

  const letterButton = get("open-letter");
  const letter = get("letter-content");

  if (letterButton && letter) {
    letterButton.onclick = function () {
      letter.hidden = !letter.hidden;
    };
  }

  const revealButton = get("reveal-button");
  const reveal = get("reveal-content");

  if (revealButton && reveal) {
    revealButton.onclick = function () {
      reveal.hidden = !reveal.hidden;
      if (!reveal.hidden) {
        reveal.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
  }

  const dialog = get("memory-dialog");
  const closeButton = get("close-memory");

  document.querySelectorAll(".memory-card").forEach(card => {
    card.onclick = function () {
      if (!dialog) return;
      const title = get("dialog-title");
      const message = get("dialog-message");
      if (title) title.textContent = card.dataset.title || "A Beautiful Memory";
      if (message) message.textContent = card.dataset.message || "";
      if (dialog.showModal) dialog.showModal();
    };
  });

  if (closeButton && dialog) {
    closeButton.onclick = () => dialog.close();
  }

  document.querySelectorAll(".reveal").forEach(section => {
    section.classList.add("visible");
  });
});

(function createMuseumSparkles() {
  const symbols = ["✦", "✧", "⋆", "·"];

  for (let i = 0; i < 18; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "museum-sparkle";
    sparkle.textContent = symbols[i % symbols.length];
    sparkle.style.left = (Math.random() * 100) + "vw";
    sparkle.style.top = (20 + Math.random() * 75) + "vh";
    sparkle.style.animationDelay = (Math.random() * 8) + "s";
    sparkle.style.animationDuration = (6 + Math.random() * 6) + "s";
    sparkle.style.fontSize = (10 + Math.random() * 12) + "px";

    document.body.appendChild(sparkle);
  }
})();
