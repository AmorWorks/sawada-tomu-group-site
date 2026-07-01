const body = document.body;
const header = document.querySelector("[data-header]");
const intro = document.querySelector("[data-intro]");
const introVideo = document.querySelector(".intro-video");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");

body.classList.add("js-ready");

let introFrame = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function updateIntro() {
  if (!intro) return;

  const introScrollable = Math.max(intro.offsetHeight - window.innerHeight, 1);
  const progress = clamp(window.scrollY / introScrollable, 0, 1);
  const layoutProgress = easeOutCubic(clamp((progress - 0.22) / 0.68, 0, 1));
  const copyProgress = easeOutCubic(clamp((progress - 0.56) / 0.34, 0, 1));
  const isDesktop = window.innerWidth > 900;
  const isMobile = window.innerWidth <= 560;
  const logoOpacity = clamp(progress * 1.35, 0, 1);
  const videoOpacity = 0.22 + progress * 0.18;
  const videoScale = 1.06 - progress * 0.035;
  const logoX = isDesktop ? -window.innerWidth * 0.18 * layoutProgress : 0;
  const logoLift = isMobile ? -86 * layoutProgress : 0;
  const logoTranslate = (1 - progress) * 46 + logoLift;
  const logoScale = 0.82 + progress * 0.18;
  const copyOpacity = copyProgress;
  const copyX = isDesktop ? 28 * (1 - copyProgress) : 0;
  const copyTranslate = (1 - progress) * 24;
  const overlayOpacity = 0.15 + progress * 0.55;

  document.documentElement.style.setProperty("--intro-progress", progress.toFixed(3));
  document.documentElement.style.setProperty("--intro-video-opacity", videoOpacity.toFixed(3));
  document.documentElement.style.setProperty("--intro-video-scale", videoScale.toFixed(3));
  document.documentElement.style.setProperty("--intro-logo-opacity", logoOpacity.toFixed(3));
  document.documentElement.style.setProperty("--intro-logo-x", `${logoX.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-logo-translate", `${logoTranslate.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-logo-scale", logoScale.toFixed(3));
  document.documentElement.style.setProperty("--intro-copy-opacity", copyOpacity.toFixed(3));
  document.documentElement.style.setProperty("--intro-copy-x", `${copyX.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-copy-translate", `${copyTranslate.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-overlay-opacity", overlayOpacity.toFixed(3));

  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }
}

function scheduleIntroUpdate() {
  if (introFrame) return;

  introFrame = requestAnimationFrame(() => {
    introFrame = 0;
    updateIntro();
  });
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

window.addEventListener("scroll", scheduleIntroUpdate, { passive: true });
window.addEventListener("resize", scheduleIntroUpdate);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (introVideo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  introVideo.loop = false;
  introVideo.play?.().catch(() => {});
}

updateIntro();
