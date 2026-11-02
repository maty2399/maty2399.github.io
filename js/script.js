const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const typewriter = document.querySelector("#typewriter");
let typingTimer;

themeIcon.textContent = document.documentElement.dataset.bsTheme === "dark" ? "☀️" : "🌙";

function setTheme(theme) {
  document.documentElement.dataset.bsTheme = theme;
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("portfolio-theme", theme);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.bsTheme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

function startTypewriter() {
  window.clearTimeout(typingTimer);
  const phrases = translations[currentLanguage].rotatingPhrases;
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function type() {
    const phrase = phrases[phraseIndex];
    typewriter.textContent = phrase.slice(0, characterIndex);

    if (!deleting && characterIndex < phrase.length) {
      characterIndex += 1;
      typingTimer = window.setTimeout(type, 95);
      return;
    }

    if (!deleting) {
      deleting = true;
      typingTimer = window.setTimeout(type, 1150);
      return;
    }

    if (characterIndex > 0) {
      characterIndex -= 1;
      typingTimer = window.setTimeout(type, 45);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingTimer = window.setTimeout(type, 250);
  }

  type();
}

updateTypewriterLanguage = startTypewriter;
startTypewriter();
