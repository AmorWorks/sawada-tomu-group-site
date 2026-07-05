const body = document.body;
const header = document.querySelector("[data-header]");
const intro = document.querySelector("[data-intro]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const formSummary = document.querySelector("[data-form-summary]");
const revealTargets = document.querySelectorAll("[data-reveal]");

body.classList.add("js-ready");

let introFrame = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateIntro() {
  const shouldCompactHeader = window.scrollY > 18 || body.classList.contains("sub-page");
  header?.classList.toggle("is-scrolled", shouldCompactHeader);
  body.classList.toggle("show-mobile-bar", window.scrollY > 120);

  if (!intro) return;

  const progress = clamp(window.scrollY / Math.max(intro.offsetHeight, 1), 0, 1);
  document.documentElement.style.setProperty("--hero-shift", `${(progress * 22).toFixed(1)}px`);
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

function setupReveal() {
  if (!revealTargets.length) return;

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    }
  );

  revealTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      target.classList.add("is-visible");
      return;
    }
    observer.observe(target);
  });
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
  formStatus.textContent = "下の控えをコピーして、LINE・Instagram DM・メールなどで送れる状態にしました。";
});

window.addEventListener("scroll", scheduleIntroUpdate, { passive: true });
window.addEventListener("resize", scheduleIntroUpdate);
window.addEventListener("load", scheduleIntroUpdate);
window.addEventListener("pageshow", scheduleIntroUpdate);

if (year) {
  year.textContent = new Date().getFullYear();
}

setupReveal();
updateIntro();
setTimeout(updateIntro, 160);
setTimeout(updateIntro, 420);
