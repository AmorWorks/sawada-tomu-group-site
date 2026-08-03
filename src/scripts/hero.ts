export {};

type FramePhase = {
  inStart: number;
  inEnd: number;
  outStart: number;
  outEnd: number;
};

const WORK_PHASES: FramePhase[] = [
  { inStart: 0, inEnd: 0, outStart: 0.14, outEnd: 0.18 },
  { inStart: 0.14, inEnd: 0.18, outStart: 0.31, outEnd: 0.35 },
  { inStart: 0.31, inEnd: 0.35, outStart: 0.48, outEnd: 0.52 },
  { inStart: 0.48, inEnd: 0.52, outStart: 0.64, outEnd: 0.69 },
];

const TEAM_REVEAL_START = 0.735;
const TEAM_REVEAL_END = 0.795;
const BRAND_REVEAL_START = 0.89;
const BRAND_REVEAL_END = 0.95;

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const smoothstep = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

const between = (value: number, start: number, end: number) => {
  if (start === end) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start));
};

const initHero = (hero: HTMLElement) => {
  if (hero.dataset.heroBound === "true") return;
  hero.dataset.heroBound = "true";

  const stage = hero.querySelector<HTMLElement>("[data-hero-stage]");
  const frames = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-frame]"));
  const progressNode = hero.querySelector<HTMLElement>("[data-hero-progress]");
  const counter = hero.querySelector<HTMLElement>("[data-hero-counter]");
  const skip = hero.querySelector<HTMLAnchorElement>("[data-hero-skip]");
  const end = hero.nextElementSibling instanceof HTMLElement && hero.nextElementSibling.matches("[data-hero-end]")
    ? hero.nextElementSibling
    : null;

  if (!stage || frames.length !== 5) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let scheduled = false;
  let currentIndex = -1;

  const setCurrentFrame = (nextIndex: number) => {
    if (nextIndex === currentIndex) return;
    currentIndex = nextIndex;

    frames.forEach((frame, index) => {
      const isCurrent = index === nextIndex;
      frame.classList.toggle("is-current", isCurrent);
      frame.setAttribute("aria-hidden", String(!isCurrent));
    });

    const label = frames[nextIndex]?.dataset.heroLabel ?? "";
    progressNode?.setAttribute("aria-valuenow", String(nextIndex + 1));
    progressNode?.setAttribute("aria-valuetext", label);
    if (counter) counter.textContent = String(nextIndex + 1).padStart(2, "0");
  };

  const setStaticState = () => {
    hero.classList.add("is-reduced-motion", "is-brand-visible");
    hero.style.setProperty("--hero-progress", "1");
    hero.style.setProperty("--brand-opacity", "1");
    hero.style.setProperty("--brand-shift", "0px");
    hero.style.setProperty("--identity-opacity", "0");
    hero.style.setProperty("--chrome-opacity", "0");
    hero.style.setProperty("--access-opacity", "0");
    hero.style.setProperty("--team-shade", "0.84");

    frames.forEach((frame, index) => {
      const isTeam = index === frames.length - 1;
      frame.style.setProperty("--frame-opacity", isTeam ? "1" : "0");
      frame.style.setProperty("--frame-scale", "1");
      frame.style.setProperty("--caption-opacity", "0");
    });

    setCurrentFrame(frames.length - 1);
  };

  const update = () => {
    scheduled = false;

    if (motionQuery.matches) {
      setStaticState();
      return;
    }

    hero.classList.remove("is-reduced-motion");

    const rect = hero.getBoundingClientRect();
    const scrollRange = Math.max(hero.offsetHeight - stage.offsetHeight, 1);
    const progress = clamp(-rect.top / scrollRange);
    const teamReveal = smoothstep(between(progress, TEAM_REVEAL_START, TEAM_REVEAL_END));
    const brandReveal = smoothstep(between(progress, BRAND_REVEAL_START, BRAND_REVEAL_END));

    WORK_PHASES.forEach((phase, index) => {
      const reveal = index === 0 ? 1 : smoothstep(between(progress, phase.inStart, phase.inEnd));
      const conceal = smoothstep(between(progress, phase.outStart, phase.outEnd));
      const opacity = reveal * (1 - conceal);
      const travel = between(progress, phase.inStart, phase.outStart);
      const scale = 1.07 - travel * 0.035;

      frames[index].style.setProperty("--frame-opacity", opacity.toFixed(4));
      frames[index].style.setProperty("--frame-scale", scale.toFixed(4));
      frames[index].style.setProperty("--caption-opacity", smoothstep(opacity).toFixed(4));
    });

    const teamFrame = frames[frames.length - 1];
    teamFrame.style.setProperty("--frame-opacity", teamReveal.toFixed(4));
    teamFrame.style.setProperty("--frame-scale", (1.12 - teamReveal * 0.12).toFixed(4));
    teamFrame.style.setProperty("--caption-opacity", "0");

    const identityFade = 1 - smoothstep(between(progress, 0.84, 0.91));
    const chromeFade = 1 - smoothstep(between(progress, 0.86, 0.93));
    const accessFade = 1 - brandReveal;
    const brandShift = (1 - brandReveal) * 30;
    const teamShade = 0.2 + brandReveal * 0.64;

    hero.style.setProperty("--hero-progress", progress.toFixed(4));
    hero.style.setProperty("--brand-opacity", brandReveal.toFixed(4));
    hero.style.setProperty("--brand-shift", `${brandShift.toFixed(2)}px`);
    hero.style.setProperty("--identity-opacity", identityFade.toFixed(4));
    hero.style.setProperty("--chrome-opacity", chromeFade.toFixed(4));
    hero.style.setProperty("--access-opacity", accessFade.toFixed(4));
    hero.style.setProperty("--team-shade", teamShade.toFixed(4));
    hero.classList.toggle("is-brand-visible", brandReveal > 0.62);

    let nextIndex = 0;
    if (progress >= TEAM_REVEAL_START + 0.025) {
      nextIndex = 4;
    } else if (progress >= WORK_PHASES[3].inStart) {
      nextIndex = 3;
    } else if (progress >= WORK_PHASES[2].inStart) {
      nextIndex = 2;
    } else if (progress >= WORK_PHASES[1].inStart) {
      nextIndex = 1;
    }
    setCurrentFrame(nextIndex);
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };

  skip?.addEventListener("click", (event) => {
    if (!end) return;
    event.preventDefault();
    end.scrollIntoView({
      behavior: motionQuery.matches ? "auto" : "smooth",
      block: "start",
    });
    window.setTimeout(() => end.focus({ preventScroll: true }), motionQuery.matches ? 0 : 450);
  });

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  motionQuery.addEventListener("change", scheduleUpdate);

  setCurrentFrame(0);
  update();
};

const initHeroes = () => {
  document.querySelectorAll<HTMLElement>("[data-hero-story]").forEach(initHero);
};

initHeroes();
document.addEventListener("astro:page-load", initHeroes);
