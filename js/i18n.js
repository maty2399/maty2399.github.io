// Para sumar contenido traducible, agregá data-i18n="clave" al elemento y la misma clave en es y en.
const translations = {
  es: {
    pageTitle: "Matías Villegas | Redes · Ciberseguridad · Cloud",
    themeToggle: "Cambiar tema",
    menuToggle: "Abrir menú",
    languageLabel: "Idioma",
    skillsLabel: "Tecnologías y áreas",
    terminalLabel: "Terminal decorativa",
    navHome: "Inicio",
    navAbout: "Sobre mí",
    navProjects: "Proyectos",
    navContact: "Contacto",
    heroGreeting: "Hola, soy",
    heroSpecialty: "Redes · Ciberseguridad · Cloud",
    heroDescription: "Conecto tecnología, seguridad y soluciones para construir infraestructuras confiables.",
    heroProjects: "Ver proyectos",
    heroGithub: "GitHub",
    terminalPrefix: "explorando",
    aboutEyebrow: "Un poco sobre mí",
    aboutTitle: "Sobre mí",
    aboutText: "Estudio la Tecnicatura Superior en Redes, Telecomunicaciones y Ciberseguridad en el IES Manuel Belgrano, en Mendoza, Argentina, y trabajo en soporte IT en la Municipalidad de Maipú. Me interesa seguir creciendo en ciberseguridad y en arquitectura e ingeniería cloud.",
    skillNetworks: "Redes",
    skillSecurity: "Ciberseguridad",
    projectsEyebrow: "Trabajo seleccionado",
    projectsTitle: "Proyectos",
    projectsIntro: "Proyectos web pequeños, terminados y listos para probar.",
    projectOneTitle: "Calculadora de subredes IPv4",
    projectOneDescription: "Calculá dirección de red, broadcast, máscara y rango de hosts a partir de una IP y un prefijo CIDR.",
    projectTwoTitle: "Memotest",
    projectTwoDescription: "Encontrá los pares con la menor cantidad de movimientos. Incluye contador y reinicio de partida.",
    projectThreeTitle: "Prueba de reflejos",
    projectThreeDescription: "Reaccioná cuando cambie la señal y medí tu tiempo. Guarda tu mejor marca en este dispositivo.",
    projectTagGame: "Minijuego",
    repoButton: "Código",
    demoButton: "Probar",
    linkedinPlaceholder: "Reemplazá # con el enlace a tu perfil",
    contactEyebrow: "Hablemos",
    contactTitle: "Contacto",
    contactText: "Encontrame en GitHub y LinkedIn.",
    footerText: "Hecho con curiosidad y café.",
    rotatingPhrases: ["redes", "ciberseguridad", "desarrollo web"]
  },
  en: {
    pageTitle: "Matías Villegas | Networks · Cybersecurity · Cloud",
    themeToggle: "Toggle theme",
    menuToggle: "Open menu",
    languageLabel: "Language",
    skillsLabel: "Technologies and areas",
    terminalLabel: "Decorative terminal",
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",
    heroGreeting: "Hi, I'm",
    heroSpecialty: "Networks · Cybersecurity · Cloud",
    heroDescription: "I connect technology, security, and solutions to build reliable infrastructure.",
    heroProjects: "View projects",
    heroGithub: "GitHub",
    terminalPrefix: "exploring",
    aboutEyebrow: "A little about me",
    aboutTitle: "About me",
    aboutText: "I am studying for a Higher Technician degree in Networks, Telecommunications, and Cybersecurity at IES Manuel Belgrano in Mendoza, Argentina, and work in IT support for the Municipality of Maipú. I am interested in growing in cybersecurity and cloud architecture and engineering.",
    skillNetworks: "Networks",
    skillSecurity: "Cybersecurity",
    projectsEyebrow: "Selected work",
    projectsTitle: "Projects",
    projectsIntro: "Small web projects, complete and ready to try.",
    projectOneTitle: "IPv4 subnet calculator",
    projectOneDescription: "Calculate the network address, broadcast, subnet mask, and host range from an IP and CIDR prefix.",
    projectTwoTitle: "Memory match",
    projectTwoDescription: "Find all matching pairs in as few moves as possible. Includes a move counter and restart.",
    projectThreeTitle: "Reaction test",
    projectThreeDescription: "React when the signal changes and measure your time. Your best score is saved on this device.",
    projectTagGame: "Mini-game",
    repoButton: "Code",
    demoButton: "Play",
    linkedinPlaceholder: "Replace # with the link to your profile",
    contactEyebrow: "Let's talk",
    contactTitle: "Contact",
    contactText: "Find me on GitHub and LinkedIn.",
    footerText: "Made with curiosity and coffee.",
    rotatingPhrases: ["networks", "cybersecurity", "web development"]
  }
};

let currentLanguage = document.documentElement.lang === "en" ? "en" : "es";
let updateTypewriterLanguage = () => {};

function setLanguage(language) {
  if (!Object.hasOwn(translations, language)) {
    return;
  }

  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = translations[language].pageTitle;
  document.querySelector(".language-switch").setAttribute("aria-label", translations[language].languageLabel);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    element.setAttribute("aria-label", translations[language][key]);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;
    element.setAttribute("title", translations[language][key]);
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("portfolio-language", language);
  updateTypewriterLanguage();
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

setLanguage(currentLanguage);
