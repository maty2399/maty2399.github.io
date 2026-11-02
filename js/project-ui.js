const projectTranslations = {
  es: {
    projectTitle: "Proyecto web | Matías Villegas",
    backPortfolio: "← Volver al portafolio",
    themeToggle: "Cambiar tema",
    languageLabel: "Idioma",
    footerNote: "Proyecto de práctica personal. Funciona directamente en el navegador; no envía datos.",
    subnetEyebrow: "Herramienta de redes",
    subnetTitle: "Calculadora de subredes IPv4",
    subnetDescription: "Ingresá una dirección IPv4 en formato CIDR para obtener los datos principales de su subred. Todo el cálculo se realiza localmente.",
    subnetLabel: "Dirección IPv4 y prefijo CIDR",
    subnetHint: "Ejemplo: 192.168.1.10/24 · Prefijos válidos: /0 a /32.",
    subnetCalculate: "Calcular subred",
    subnetResults: "Resultado",
    subnetNetwork: "Dirección de red",
    subnetBroadcast: "Dirección de broadcast",
    subnetMask: "Máscara de subred",
    subnetFirstHost: "Primer host",
    subnetLastHost: "Último host",
    subnetUsableHosts: "Direcciones utilizables",
    subnetInvalid: "Ingresá una IPv4 válida seguida de un prefijo CIDR entre /0 y /32.",
    subnetHostNote: "Para /31 y /32 se muestran las direcciones disponibles según esos prefijos.",
    memoryEyebrow: "Minijuego",
    memoryTitle: "Memotest",
    memoryDescription: "Encontrá todos los pares. Cada intento cuenta cuando das vuelta dos tarjetas.",
    memoryMoves: "Movimientos",
    memoryNewGame: "Nueva partida",
    memoryBoardLabel: "Tablero de memoria",
    memoryCardHidden: "Tarjeta oculta",
    memoryCardShown: "Tarjeta: {{symbol}}",
    memoryReady: "¡A jugar! Elegí una tarjeta.",
    memoryWon: "¡Completado en {{moves}} movimientos! Muy bien.",
    reflexEyebrow: "Minijuego",
    reflexTitle: "Prueba de reflejos",
    reflexDescription: "Iniciá la prueba y esperá a que la señal cambie. Tocá el área verde lo más rápido posible.",
    reflexStart: "Iniciar prueba",
    reflexReady: "Presioná “Iniciar prueba” cuando estés listo.",
    reflexWaiting: "Esperá a que la señal se ponga verde…",
    reflexGo: "¡Ahora! Tocá acá",
    reflexTooSoon: "¡Muy pronto! Esperá a que se ponga verde e intentá de nuevo.",
    reflexResult: "Tu tiempo: {{time}} ms.",
    reflexBest: "Mejor tiempo",
    reflexNoBest: "Todavía no hay marca"
  },
  en: {
    projectTitle: "Web project | Matías Villegas",
    backPortfolio: "← Back to portfolio",
    themeToggle: "Toggle theme",
    languageLabel: "Language",
    footerNote: "Personal practice project. Runs in your browser and does not send data.",
    subnetEyebrow: "Networking tool",
    subnetTitle: "IPv4 subnet calculator",
    subnetDescription: "Enter an IPv4 address in CIDR format to see the key details of its subnet. All calculations run locally.",
    subnetLabel: "IPv4 address and CIDR prefix",
    subnetHint: "Example: 192.168.1.10/24 · Valid prefixes: /0 to /32.",
    subnetCalculate: "Calculate subnet",
    subnetResults: "Result",
    subnetNetwork: "Network address",
    subnetBroadcast: "Broadcast address",
    subnetMask: "Subnet mask",
    subnetFirstHost: "First host",
    subnetLastHost: "Last host",
    subnetUsableHosts: "Usable addresses",
    subnetInvalid: "Enter a valid IPv4 address followed by a CIDR prefix from /0 to /32.",
    subnetHostNote: "For /31 and /32, available addresses are shown according to those prefixes.",
    memoryEyebrow: "Mini-game",
    memoryTitle: "Memory match",
    memoryDescription: "Find every pair. Each attempt counts when you turn over two cards.",
    memoryMoves: "Moves",
    memoryNewGame: "New game",
    memoryBoardLabel: "Memory game board",
    memoryCardHidden: "Hidden card",
    memoryCardShown: "Card: {{symbol}}",
    memoryReady: "Let's play! Choose a card.",
    memoryWon: "Completed in {{moves}} moves! Well done.",
    reflexEyebrow: "Mini-game",
    reflexTitle: "Reaction test",
    reflexDescription: "Start the test and wait for the signal to change. Click the green area as quickly as you can.",
    reflexStart: "Start test",
    reflexReady: "Press “Start test” when you're ready.",
    reflexWaiting: "Wait for the signal to turn green…",
    reflexGo: "Now! Click here",
    reflexTooSoon: "Too soon! Wait for green and try again.",
    reflexResult: "Your time: {{time}} ms.",
    reflexBest: "Best time",
    reflexNoBest: "No score yet"
  }
};

let projectLanguage = document.documentElement.lang === "en" ? "en" : "es";

function projectText(key, values = {}) {
  let text = projectTranslations[projectLanguage][key];
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{{${name}}}`, value);
  }
  return text;
}

function setProjectLanguage(language) {
  if (!Object.hasOwn(projectTranslations, language)) {
    return;
  }

  projectLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = projectText(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = projectText(element.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", projectText(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  document.querySelector(".project-language").setAttribute("aria-label", projectText("languageLabel"));
  localStorage.setItem("portfolio-language", language);
  document.dispatchEvent(new CustomEvent("projectlanguagechange", { detail: { language } }));
}

function setProjectTheme(theme) {
  document.documentElement.dataset.bsTheme = theme;
  document.querySelector("#theme-icon").textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("portfolio-theme", theme);
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setProjectLanguage(button.dataset.language));
});

document.querySelector("#theme-toggle").addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.bsTheme === "dark" ? "light" : "dark";
  setProjectTheme(nextTheme);
});

setProjectLanguage(projectLanguage);
setProjectTheme(document.documentElement.dataset.bsTheme);
