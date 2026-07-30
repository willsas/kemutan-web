/* Kemutan — the only three things this page needs JavaScript for.
   No framework, no dependencies, ~2KB. Everything else is CSS. */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Demo video ----------
     The clip is `preload="none"`, so nothing downloads until it's actually on
     screen — the poster does the work above the fold. It also pauses when
     scrolled away, and never autoplays for anyone who asked for less motion. */

  const video = document.getElementById("demo-video");

  if (video) {
    video.addEventListener("click", () => {
      video.paused ? video.play().catch(() => {}) : video.pause();
    });

    if (reduceMotion) {
      video.setAttribute("controls", "");
    } else if ("IntersectionObserver" in window) {
      const watcher = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        },
        { threshold: 0.35 }
      );
      watcher.observe(video);
    } else {
      video.play().catch(() => {});
    }
  }

  /* ---------- Screenshot lightbox ----------
     <dialog> handles Escape, the backdrop and focus; this only tracks which
     shot is showing. */

  const dialog = document.getElementById("lightbox");
  const full = document.getElementById("lightbox-img");
  const shots = Array.from(document.querySelectorAll(".shot"));

  if (dialog && full && shots.length) {
    const sources = shots.map((shot) => {
      const img = shot.querySelector("img");
      return { src: img.currentSrc || img.src, alt: img.alt };
    });

    let index = 0;

    const show = (next) => {
      index = (next + sources.length) % sources.length;
      full.src = sources[index].src;
      full.alt = sources[index].alt;
    };

    shots.forEach((shot, position) => {
      shot.addEventListener("click", () => {
        show(position);
        dialog.showModal();
      });
    });

    document.getElementById("lightbox-prev").addEventListener("click", () => show(index - 1));
    document.getElementById("lightbox-next").addEventListener("click", () => show(index + 1));
    document.getElementById("lightbox-close").addEventListener("click", () => dialog.close());

    // Clicking the backdrop (anywhere that isn't the image or the controls).
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(index - 1);
      if (event.key === "ArrowRight") show(index + 1);
    });
  }

  /* ---------- Reveal on scroll ----------
     Purely additive: the markup ships visible for anyone without
     IntersectionObserver, and the CSS opts out under reduced motion. */

  const revealables = document.querySelectorAll(".reveal");

  if (!revealables.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const revealer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, position) => {
        if (!entry.isIntersecting) return;
        // A short stagger so a row of cards lands one after another.
        entry.target.style.transitionDelay = `${Math.min(position * 60, 240)}ms`;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  revealables.forEach((el) => revealer.observe(el));
})();
