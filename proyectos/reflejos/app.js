const startTestButton = document.querySelector("#start-test");
const reactionTarget = document.querySelector("#reaction-target");
const reactionArea = document.querySelector("#reaction-area");
const reactionMessage = document.querySelector("#reaction-message");
const bestTimeElement = document.querySelector("#best-time");
const bestTimeKey = "portfolio-reflex-best";
let reactionTimer;
let startedAt = 0;
let phase = "ready";
let lastTime = null;
let bestTime = Number(localStorage.getItem(bestTimeKey)) || null;

function updateBestTime() {
  bestTimeElement.textContent = bestTime === null ? projectText("reflexNoBest") : `${bestTime} ms`;
}

function renderReaction() {
  reactionArea.classList.toggle("waiting", phase === "waiting");
  reactionArea.classList.toggle("go", phase === "go");
  reactionTarget.disabled = phase !== "go" && phase !== "waiting";

  if (phase === "ready") {
    reactionTarget.textContent = projectText("reflexReady");
  } else if (phase === "waiting") {
    reactionTarget.textContent = projectText("reflexWaiting");
  } else if (phase === "go") {
    reactionTarget.textContent = projectText("reflexGo");
  }

  if (phase === "tooSoon") {
    reactionMessage.textContent = projectText("reflexTooSoon");
  } else if (phase === "result") {
    reactionMessage.textContent = projectText("reflexResult", { time: lastTime });
  } else {
    reactionMessage.textContent = "";
  }
  updateBestTime();
}

function startTest() {
  window.clearTimeout(reactionTimer);
  phase = "waiting";
  lastTime = null;
  startTestButton.disabled = true;
  renderReaction();
  const delay = 1500 + Math.floor(Math.random() * 2501);
  reactionTimer = window.setTimeout(() => {
    phase = "go";
    startedAt = performance.now();
    startTestButton.disabled = false;
    renderReaction();
  }, delay);
}

startTestButton.addEventListener("click", startTest);

reactionTarget.addEventListener("click", () => {
  if (phase === "waiting") {
    window.clearTimeout(reactionTimer);
    phase = "tooSoon";
    startTestButton.disabled = false;
    renderReaction();
    return;
  }

  if (phase !== "go") {
    return;
  }

  lastTime = Math.round(performance.now() - startedAt);
  phase = "result";
  if (bestTime === null || lastTime < bestTime) {
    bestTime = lastTime;
    localStorage.setItem(bestTimeKey, String(bestTime));
  }
  renderReaction();
});

document.addEventListener("projectlanguagechange", renderReaction);
renderReaction();
