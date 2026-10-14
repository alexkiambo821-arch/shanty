
document.addEventListener("DOMContentLoaded", function () {
  const get = (id) => document.getElementById(id);

  // Museum entrance
  const intro = get("intro");
  const museum = get("museum");
  const enterButton = get("enter-museum");

  if (enterButton && intro && museum) {
    enterButton.addEventListener("click", function () {
      museum.classList.add("ready");
      intro.classList.add("leaving");

      setTimeout(function () {
        intro.style.display = "none";
      }, 1200);
    });
  }

  // Live dating timer: 19 April 2026
  function updateTimer() {
    const start = new Date("2026-04-19T00:00:00").getTime();
    const diff = Math.max(0, Date.now() - start);

    const values = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };

    Object.entries(values).forEach(function ([id, value]) {
      const el = get(id);
      if (el) {
        el.textContent = id === "days"
          ? value
          : String(value).padStart(2, "0");
      }
    });
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // Background music
  const music = get("background-music");
  const musicToggle = get("music-toggle");

  if (music && musicToggle) {
    musicToggle.addEventListener("click", async function () {
      if (music.paused) {
        try {
          await music.play();
          musicToggle.textContent = "♫ Music On";
          musicToggle.setAttribute("aria-pressed", "true");
        } catch (error) {
          alert("Add a valid music.mp3 file to your GitHub repository first.");
        }
      } else {
        music.pause();
        musicToggle.textContent = "♫ Music Off";
        musicToggle.setAttribute("aria-pressed", "false");
      }
    });
  }

  // Love letter
  const letterButton = get("open-letter");
  const letterContent = get("letter-content");

  if (letterButton && letterContent) {
    letterButton.addEventListener("click", function () {
      const opening = letterContent.hidden;
      letterContent.hidden = !opening;
      letterButton.textContent = opening
        ? "Close My Letter"
        : "Open My Letter";
    });
  }

  // Final photograph reveal
  const revealButton = get("reveal-button");
  const revealContent = get("reveal-content");

  if (revealButton && revealContent) {
    revealButton.addEventListener("click", function () {
      const opening = revealContent.hidden;
      revealContent.hidden = !opening;
      revealButton.textContent = opening
        ? "Keep This Moment Close ♥"
        : "Reveal Our Moment ♥";

      if (opening) {
        revealContent.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  }

  // Memory exhibit pop-up
  const dialog = get("memory-dialog");
  const dialogTitle = get("dialog-title");
  const dialogMessage = get("dialog-message");
  const closeMemory = get("close-memory");

  document.querySelectorAll(".memory-card").forEach(function (card) {
    card.addEventListener("click", function () {
      if (dialog && dialogTitle && dialogMessage) {
        dialogTitle.textContent = card.dataset.title || "A Beautiful Memory";
        dialogMessage.textContent = card.dataset.message || "";
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          alert(
            dialogTitle.textContent + "\n\n" +
            dialogMessage.textContent
          );
        }
      }
    });
  });

  if (closeMemory && dialog) {
    closeMemory.addEventListener("click", function () {
      dialog.close();
    });
  }

  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }

  // Reveal sections as visitors scroll
  const sections = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    sections.forEach(function (section) {
      section.classList.add("visible");
    });
  }
});
