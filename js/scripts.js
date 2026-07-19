const header = document.querySelector(".site-header");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const yearEl = document.getElementById("year");
const langToggle = document.getElementById("lang-toggle");
const themeToggle = document.getElementById("theme-toggle");

const LANG_KEY = "portfolio-lang";
const LANG_SET_KEY = "portfolio-lang-set";
const THEME_KEY = "portfolio-theme";

let lastScrollY = 0;
let ticking = false;

function getLang() {
  const stored = localStorage.getItem(LANG_KEY);
  // Só usa inglês se o usuário tiver escolhido explicitamente
  if (stored === "en" && localStorage.getItem(LANG_SET_KEY) === "1") {
    return "en";
  }
  return "pt";
}

function getTheme() {
  return (
    document.documentElement.getAttribute("data-theme") ||
    localStorage.getItem(THEME_KEY) ||
    "dark"
  );
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  const dict = translations[getLang()] || translations.pt;
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? dict["ctrl.themeAriaLight"] : dict["ctrl.themeAriaDark"]
    );
  }
}

function setLang(lang, { persist = false } = {}) {
  const next = lang === "en" ? "en" : "pt";

  if (persist) {
    localStorage.setItem(LANG_KEY, next);
    localStorage.setItem(LANG_SET_KEY, "1");
  }

  document.documentElement.setAttribute("data-lang", next);
  applyLanguage(next);
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

setTheme(getTheme());
setLang(getLang());

langToggle?.addEventListener("click", () => {
  setLang(getLang() === "pt" ? "en" : "pt", { persist: true });
});

themeToggle?.addEventListener("click", () => {
  setTheme(getTheme() === "dark" ? "light" : "dark");
});

function updateHeader() {
  const currentY = window.scrollY;

  if (currentY > 24) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }

  if (currentY > lastScrollY && currentY > 120) {
    header.classList.add("is-hidden");
  } else {
    header.classList.remove("is-hidden");
  }

  lastScrollY = currentY;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  },
  { passive: true }
);

hamburger?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));

  const dict = translations[getLang()] || translations.pt;
  hamburger.setAttribute(
    "aria-label",
    isOpen ? dict["nav.menuClose"] : dict["nav.menuOpen"]
  );
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger?.classList.remove("active");
    hamburger?.setAttribute("aria-expanded", "false");

    const dict = translations[getLang()] || translations.pt;
    hamburger?.setAttribute("aria-label", dict["nav.menuOpen"]);
  });
});

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

const timelineItems = document.querySelectorAll("[data-timeline-item]");

timelineItems.forEach((item) => {
  const toggle = item.querySelector(".timeline-toggle");

  toggle?.addEventListener("click", () => {
    const willOpen = !item.classList.contains("is-open");

    timelineItems.forEach((other) => {
      const otherToggle = other.querySelector(".timeline-toggle");
      other.classList.remove("is-open");
      otherToggle?.setAttribute("aria-expanded", "false");
    });

    if (willOpen) {
      item.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});
