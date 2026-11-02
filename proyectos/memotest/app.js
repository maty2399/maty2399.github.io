const memoryBoard = document.querySelector("#memory-board");
const moveCount = document.querySelector("#move-count");
const memoryMessage = document.querySelector("#memory-message");
const memorySymbols = ["🌙", "🌙", "⭐", "⭐", "⚡", "⚡", "☁️", "☁️", "🪐", "🪐", "🌿", "🌿", "🔥", "🔥", "💎", "💎"];
let cards = [];
let selectedCards = [];
let moves = 0;
let lockBoard = false;
let comparisonTimer;

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function cardAccessibleLabel(card) {
  return card.isRevealed || card.isMatched
    ? projectText("memoryCardShown", { symbol: card.symbol })
    : projectText("memoryCardHidden");
}

function renderCards() {
  memoryBoard.replaceChildren();
  cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "memory-card";
    button.textContent = card.isRevealed || card.isMatched ? card.symbol : "?";
    button.setAttribute("aria-label", cardAccessibleLabel(card));
    button.setAttribute("aria-pressed", String(card.isRevealed || card.isMatched));
    button.disabled = card.isMatched;

    if (card.isRevealed) {
      button.classList.add("is-flipped");
    }
    if (card.isMatched) {
      button.classList.add("is-matched");
    }

    button.addEventListener("click", () => revealCard(index));
    memoryBoard.append(button);
  });
}

function startNewGame() {
  window.clearTimeout(comparisonTimer);
  cards = shuffle(memorySymbols).map((symbol) => ({ symbol, isRevealed: false, isMatched: false }));
  selectedCards = [];
  moves = 0;
  lockBoard = false;
  moveCount.textContent = "0";
  memoryMessage.textContent = projectText("memoryReady");
  renderCards();
}

function revealCard(index) {
  const card = cards[index];
  if (lockBoard || card.isMatched || card.isRevealed) {
    return;
  }

  card.isRevealed = true;
  selectedCards.push(index);
  renderCards();

  if (selectedCards.length < 2) {
    return;
  }

  moves += 1;
  moveCount.textContent = String(moves);
  const [firstIndex, secondIndex] = selectedCards;
  const first = cards[firstIndex];
  const second = cards[secondIndex];

  if (first.symbol === second.symbol) {
    first.isMatched = true;
    second.isMatched = true;
    selectedCards = [];
    renderCards();
    if (cards.every((entry) => entry.isMatched)) {
      memoryMessage.textContent = projectText("memoryWon", { moves });
    }
    return;
  }

  lockBoard = true;
  comparisonTimer = window.setTimeout(() => {
    first.isRevealed = false;
    second.isRevealed = false;
    selectedCards = [];
    lockBoard = false;
    renderCards();
  }, 800);
}

document.querySelector("#new-game").addEventListener("click", startNewGame);
document.addEventListener("projectlanguagechange", () => {
  if (cards.length && cards.every((card) => card.isMatched)) {
    memoryMessage.textContent = projectText("memoryWon", { moves });
  } else {
    memoryMessage.textContent = projectText("memoryReady");
  }
  renderCards();
});

startNewGame();
