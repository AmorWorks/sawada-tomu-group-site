const body = document.body;
const header = document.querySelector("[data-header]");
const intro = document.querySelector("[data-intro]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const formSummary = document.querySelector("[data-form-summary]");

body.classList.add("js-ready");

let introFrame = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateIntro() {
  if (!intro) {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
    return;
  }

  const introScrollable = Math.max(intro.offsetHeight - window.innerHeight, 1);
  const progress = clamp(window.scrollY / introScrollable, 0, 1);
  const copyProgress = 1;
  const logoOpacity = 0.16;
  const photoScale = 1.06 - progress * 0.035;
  const logoX = 0;
  const logoTranslate = 0;
  const logoScale = 1;
  const copyX = 0;
  const copyTranslate = 0;
  const overlayOpacity = 0.88;

  document.documentElement.style.setProperty("--intro-photo-opacity", "1");
  document.documentElement.style.setProperty("--intro-photo-scale", photoScale.toFixed(3));
  document.documentElement.style.setProperty("--intro-logo-opacity", logoOpacity.toFixed(3));
  document.documentElement.style.setProperty("--intro-logo-x", `${logoX.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-logo-translate", `${logoTranslate.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-logo-scale", logoScale.toFixed(3));
  document.documentElement.style.setProperty("--intro-copy-opacity", copyProgress.toFixed(3));
  document.documentElement.style.setProperty("--intro-copy-x", `${copyX.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-copy-translate", `${copyTranslate.toFixed(1)}px`);
  document.documentElement.style.setProperty("--intro-overlay-opacity", overlayOpacity.toFixed(3));

  header?.classList.toggle("is-scrolled", window.scrollY > 18);
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

function buildContactSummary(form) {
  const data = new FormData(form);
  return [
    "【STG ホームページ相談内容】",
    `お名前: ${data.get("name") || "未入力"}`,
    `連絡先: ${data.get("contact") || "未入力"}`,
    `相談内容: ${data.get("type") || "未選択"}`,
    `現場エリア: ${data.get("area") || "未入力"}`,
    "",
    "詳細:",
    data.get("message") || "未入力",
  ].join("\n");
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

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formSummary || !formStatus) return;

  formSummary.hidden = false;
  formSummary.value = buildContactSummary(contactForm);
  formStatus.textContent = "下の控えをコピーして、LINEやメールで送れる状態にしました。";
});

window.addEventListener("scroll", scheduleIntroUpdate, { passive: true });
window.addEventListener("resize", scheduleIntroUpdate);

if (year) {
  year.textContent = new Date().getFullYear();
}

updateIntro();
