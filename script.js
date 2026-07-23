const body = document.body;
const header = document.querySelector("[data-header]");
const intro = document.querySelector("[data-intro]");
const storyHero = document.querySelector("[data-story-hero]");
const storyFrames = Array.from(document.querySelectorAll("[data-story-frame]"));
const storyHome = document.querySelector("[data-story-home]");
const storyProgress = document.querySelector("[data-story-progress]");
const storyProgressBar = document.querySelector("[data-story-progress-bar]");
const storyCounter = document.querySelector("[data-story-counter]");
const storyScrollCue = document.querySelector("[data-story-scroll-cue]");
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

function smoothstep(value) {
  const progress = clamp(value, 0, 1);
  return progress * progress * (3 - 2 * progress);
}

function updateStory() {
  if (!storyHero || !storyFrames.length) return false;

  const rect = storyHero.getBoundingClientRect();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const storyActive = rect.top <= 0 && rect.bottom > window.innerHeight;

  if (reducedMotion) {
    storyFrames.forEach((frame, index) => {
      const isFinal = index === storyFrames.length - 1;
      frame.style.setProperty("--frame-opacity", isFinal ? "1" : "0");
      frame.style.setProperty("--frame-scale", "1");
      frame.setAttribute("aria-hidden", String(!isFinal));
      frame.classList.toggle("is-current", isFinal);
      if (isFinal) {
        frame.style.setProperty("--final-shade-opacity", "1");
      }
    });
    storyHome?.classList.add("is-visible");
    storyHome?.style.setProperty("opacity", "1");
    storyHome?.style.setProperty("transform", "none");
    if (storyHome) {
      storyHome.inert = false;
      storyHome.setAttribute("aria-hidden", "false");
    }
    return storyActive;
  }

  const scrollRange = Math.max(storyHero.offsetHeight - window.innerHeight, 1);
  const progress = clamp(-rect.top / scrollRange, 0, 1);
  const scaledProgress = progress * storyFrames.length;
  const baseIndex = Math.min(Math.floor(scaledProgress), storyFrames.length - 1);
  const frameProgress = scaledProgress - baseIndex;
  const blend = baseIndex < storyFrames.length - 1
    ? smoothstep((frameProgress - 0.68) / 0.32)
    : 0;
  const finalIndex = storyFrames.length - 1;
  const preFinalFade = smoothstep((progress - 0.72) / 0.035);
  const finalReveal = smoothstep((progress - 0.765) / 0.035);
  let currentIndex = blend >= 0.5
    ? Math.min(baseIndex + 1, storyFrames.length - 1)
    : baseIndex;

  if (progress >= 0.72) {
    currentIndex = finalReveal >= 0.5 ? finalIndex : finalIndex - 1;
  }

  storyFrames.forEach((frame, index) => {
    let opacity = 0;
    let localProgress = 0;

    if (index === baseIndex) {
      opacity = baseIndex === storyFrames.length - 1 ? 1 : 1 - blend;
      localProgress = frameProgress;
    } else if (index === baseIndex + 1) {
      opacity = blend;
    }

    if (index === finalIndex - 1 && progress >= 0.72) {
      opacity = 1 - preFinalFade;
      localProgress = 1;
    }

    if (index === finalIndex && progress >= 0.72) {
      opacity = finalReveal;
      localProgress = 0;
    }

    const scale = index === finalIndex
      ? 1.16 - finalReveal * 0.16
      : 1.075 - Math.min(localProgress, 1) * 0.035;
    const caption = frame.querySelector(".story-caption");

    frame.style.setProperty("--frame-opacity", opacity.toFixed(3));
    frame.style.setProperty("--frame-scale", scale.toFixed(4));
    frame.classList.toggle("is-current", index === currentIndex);
    frame.setAttribute("aria-hidden", String(index !== currentIndex));

    if (caption) {
      const captionOpacity = smoothstep(clamp(opacity * 1.35, 0, 1));
      caption.style.setProperty("--caption-opacity", captionOpacity.toFixed(3));
      caption.style.setProperty("--caption-shift", `${((1 - captionOpacity) * 18).toFixed(1)}px`);
    }
  });

  const homeProgress = smoothstep((progress - 0.93) / 0.07);
  storyFrames[finalIndex]?.style.setProperty(
    "--final-shade-opacity",
    (0.22 + homeProgress * 0.78).toFixed(3)
  );
  if (storyHome) {
    storyHome.style.opacity = homeProgress.toFixed(3);
    storyHome.style.transform = `translate3d(0, ${((1 - homeProgress) * 28).toFixed(1)}px, 0)`;
    storyHome.classList.toggle("is-visible", homeProgress > 0.7);
    storyHome.inert = homeProgress <= 0.7;
    storyHome.setAttribute("aria-hidden", String(homeProgress <= 0.7));
  }

  if (storyProgress) {
    storyProgress.style.setProperty("--story-progress", progress.toFixed(4));
    storyProgress.style.opacity = (1 - homeProgress).toFixed(3);
    storyProgress.setAttribute("aria-valuenow", String(currentIndex + 1));
  }
  if (storyProgressBar) {
    storyProgressBar.style.setProperty("--story-progress", progress.toFixed(4));
  }
  if (storyCounter) {
    storyCounter.textContent = String(currentIndex + 1).padStart(2, "0");
  }
  storyScrollCue?.classList.toggle("is-hidden", progress > 0.035);

  return storyActive;
}

function updateIntro() {
  const storyActive = updateStory();
  const shouldCompactHeader =
    (window.scrollY > 18 && !storyActive) || body.classList.contains("sub-page");
  header?.classList.toggle("is-scrolled", shouldCompactHeader);
  body.classList.toggle("story-active", storyActive);
  body.classList.toggle("show-mobile-bar", window.scrollY > 120 && !storyActive);

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
  formStatus.textContent = "控えを作成しました。LINE・Instagram DM・メール送信時にご利用ください。";
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
