(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  /* ---------- Apparition au scroll (.reveal) ---------- */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const wh = window.innerHeight;
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < wh - 100) {
        el.classList.add("visible");
      }
    });
  }

  let scrollScheduled = false;
  function onScroll() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      revealOnScroll();
      scrollScheduled = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  revealOnScroll();

  /* ---------- Gravure : aperçu texte en direct ---------- */
  const gravureInput = document.getElementById("gravure-input") || document.querySelector(".gravure-box input");
  const previewText = document.getElementById("gravurePreview");
  const previewImg = document.getElementById("bijouPreview");

  function goToPersonnalisation(focusInput) {
    document.getElementById("personnaliser")?.scrollIntoView({
      behavior: scrollBehavior,
      block: "start",
    });
    if (focusInput && gravureInput) {
      const delay = prefersReducedMotion ? 0 : 450;
      setTimeout(() => gravureInput.focus(), delay);
    }
  }

  document.querySelectorAll("[data-scroll-to]").forEach((el) => {
    el.addEventListener("click", () => {
      if (el.getAttribute("data-scroll-to") === "personnaliser") {
        goToPersonnalisation(true);
      }
    });
  });

  if (gravureInput && previewText) {
    if (!gravureInput.getAttribute("maxlength")) gravureInput.setAttribute("maxlength", "25");
    gravureInput.addEventListener("input", (e) => {
      const v = e.target.value;
      previewText.textContent = v.length ? v : "Votre texte";
    });
  }

  /* ---------- Choix du modèle : image d’aperçu + scroll ---------- */
  const MODEL_IMAGES = {
    "Modèle Essentiel": "images/collier.png",
    "Modèle Élégance": "images/bracelet.png",
    "Modèle Minimal": "images/collier.png",
    "Modèle Signature": "images/bracelet.png",
  };

  function selectProductCard(card) {
    if (!card || !previewImg) return;

    document.querySelectorAll(".product-card").forEach((c) => {
      c.classList.remove("selected");
      c.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
    });

    card.classList.add("selected");
    const btn = card.querySelector("button");
    if (btn) btn.setAttribute("aria-pressed", "true");

    const title = card.querySelector("h3")?.textContent.trim() || "";
    const src = MODEL_IMAGES[title] || "images/collier.png";
    previewImg.src = src;
    previewImg.alt = title
      ? `Aperçu du bijou — ${title}`
      : "Aperçu du bijou personnalisé";
  }

  document.querySelectorAll(".product-card button").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      selectProductCard(card);
      goToPersonnalisation(false);
    });
  });

  /* ---------- Compte à rebours Saint-Valentin ---------- */
  const countdownEl = document.getElementById("countdown");
  const OFFER_END = new Date("2026-02-14T23:59:59").getTime();

  function updateCountdown() {
    if (!countdownEl) return;

    const diff = OFFER_END - Date.now();

    if (diff <= 0) {
      countdownEl.textContent = "l’offre est terminée";
      return false;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    countdownEl.textContent = `${d}j ${h}h ${m}m`;
    return true;
  }

  if (countdownEl) {
    updateCountdown();
    const timerId = setInterval(() => {
      if (!updateCountdown()) clearInterval(timerId);
    }, 1000);
  }
})();
