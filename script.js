const body = document.body;
const header = document.querySelector("[data-header]");
const intro = document.querySelector("[data-intro]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");

body.classList.add("js-ready");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateIntro() {
  if (!intro) return;

  const introScrollable = Math.max(intro.offsetHeight - window.innerHeight, 1);
  const progress = clamp(window.scrollY / introScrollable, 0, 1);
  const logoOpacity = clamp(progress * 1.35, 0, 1);
  const logoTranslate = (1 - progress) * 46;
  const logoScale = 0.82 + progress * 0.18;
  const copyOpacity = clamp((progress - 0.56) * 2.8, 0, 1);
  const copyTranslate = (1 - progress) * 24;
  const overlayOpacity = 0.15 + progress * 0.55;

  document.documentElement.style.setProperty("--intro-progress", progress.toFixed(3));
  document.documentElement.style.setProperty("--intro-logo-opacity", logoOpacity.toFixed(3));
  document.documentElement.style.setProperty("--intro-logo-translate", `${logoTranslate.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-logo-scale", logoScale.toFixed(3));
  document.documentElement.style.setProperty("--intro-copy-opacity", copyOpacity.toFixed(3));
  document.documentElement.style.setProperty("--intro-copy-translate", `${copyTranslate.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-overlay-opacity", overlayOpacity.toFixed(3));

  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }
}

function closeMenu() {
  body.classList.remove("menu-open");
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const willOpen = !body.classList.contains("menu-open");
  body.classList.toggle("menu-open", willOpen);
  nav?.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateIntro, { passive: true });
window.addEventListener("resize", updateIntro);

if (year) {
  year.textContent = new Date().getFullYear();
}

updateIntro();
