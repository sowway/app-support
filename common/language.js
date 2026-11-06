(function () {
  const storageKey = "sowway-lang";
  const validLanguage = value => value === "ko" || value === "en";
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  let savedLanguage;

  try {
    savedLanguage = localStorage.getItem(storageKey);
    if (!validLanguage(savedLanguage)) savedLanguage = localStorage.getItem("dtw-lang");
  } catch (error) {
    console.warn("Language preference could not be read from browser storage.", error);
  }

  function rememberLanguage(lang) {
    try {
      localStorage.setItem(storageKey, lang);
    } catch (error) {
      console.warn("Language preference could not be saved to browser storage.", error);
    }
  }

  const homeLanguage = document.body.dataset.homeLanguage;
  const lang = validLanguage(requestedLanguage)
    ? requestedLanguage
    : homeLanguage === "ko" || homeLanguage === "en"
      ? homeLanguage
      : validLanguage(savedLanguage) ? savedLanguage : "en";

  if (homeLanguage) {
    if (validLanguage(requestedLanguage) || homeLanguage !== "default") {
      rememberLanguage(lang);
    }
    if ((lang === "ko") !== (homeLanguage === "ko")) {
      const target = new URL(lang === "ko" ? "index-ko.html" : "index.html", window.location.href);
      target.searchParams.set("lang", lang);
      target.hash = window.location.hash;
      window.location.replace(target.href);
      return;
    }
  }

  function setLanguage(language) {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-ko][data-en]").forEach(element => {
      element.textContent = language === "ko" ? element.dataset.ko : element.dataset.en;
    });
    document.querySelectorAll("button[data-language]").forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("a[data-language-link]").forEach(link => {
      const target = new URL(link.getAttribute("href"), window.location.href);
      target.searchParams.set("lang", language);
      link.href = target.href;
    });
  }

  setLanguage(lang);
  if (!homeLanguage && validLanguage(requestedLanguage)) rememberLanguage(lang);

  document.querySelectorAll("button[data-language]").forEach(button => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      if (!validLanguage(language)) return;
      rememberLanguage(language);
      setLanguage(language);
      const current = new URL(window.location.href);
      current.searchParams.set("lang", language);
      window.history.replaceState(window.history.state, "", current.href);
    });
  });
})();
