export {};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const bindExperience = () => {
  const root = document.documentElement;
  if (root.dataset.experienceBound === "true") return;
  root.dataset.experienceBound = "true";
  root.classList.add("experience-ready");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const forceReduction = import.meta.env.DEV
    && new URLSearchParams(window.location.search).get("motion") === "reduce";
  const motionIsReduced = () => reduceMotion.matches || forceReduction;
  root.classList.toggle("is-forced-reduced-motion", forceReduction);
  const entry = document.querySelector<HTMLElement>("[data-entry]");
  const team = document.querySelector<HTMLElement>("[data-team]");
  const journeySteps = Array.from(document.querySelectorAll<HTMLElement>("[data-journey-step]"));

  const showJourney = () => journeySteps.forEach((step) => step.classList.add("is-visible"));

  let observer: IntersectionObserver | undefined;
  if ("IntersectionObserver" in window && !motionIsReduced()) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          if (item.isIntersecting) item.target.classList.add("is-visible");
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10%" },
    );
    journeySteps.forEach((step) => observer?.observe(step));
  } else {
    showJourney();
  }

  let frame = 0;
  const update = () => {
    frame = 0;

    if (motionIsReduced()) {
      entry?.style.setProperty("--entry-progress", "0");
      team?.style.setProperty("--team-inset-y", "0%");
      team?.style.setProperty("--team-inset-x", "0%");
      team?.style.setProperty("--team-photo-scale", "1");
      team?.style.setProperty("--team-copy-opacity", "1");
      showJourney();
      return;
    }

    if (entry) {
      const bounds = entry.getBoundingClientRect();
      const distance = Math.max(1, entry.offsetHeight - window.innerHeight);
      const progress = clamp(-bounds.top / distance);
      entry.style.setProperty("--entry-progress", progress.toFixed(4));
    }

    if (team) {
      const bounds = team.getBoundingClientRect();
      const distance = Math.max(1, team.offsetHeight - window.innerHeight);
      const progress = clamp(-bounds.top / distance);
      const open = clamp(progress / 0.58);
      const hold = clamp((progress - 0.54) / 0.2);
      const insetY = 36 * (1 - open);
      const insetX = 31 * (1 - open);
      const scale = 1.1 - open * 0.1;

      team.style.setProperty("--team-inset-y", `${insetY.toFixed(2)}%`);
      team.style.setProperty("--team-inset-x", `${insetX.toFixed(2)}%`);
      team.style.setProperty("--team-photo-scale", scale.toFixed(4));
      team.style.setProperty("--team-copy-opacity", hold.toFixed(4));
    }
  };

  const requestUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  reduceMotion.addEventListener?.("change", requestUpdate);
  update();
};

bindExperience();
document.addEventListener("astro:page-load", bindExperience);
