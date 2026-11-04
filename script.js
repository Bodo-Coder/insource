/*
 * The booking target is deliberately centralized. Replace the value once the
 * joint booking system has been selected; all CTAs inherit it automatically.
 */
const BOOKING_URL = "#booking-placeholder";

document.querySelectorAll("[data-booking-link]").forEach((link) => {
  link.href = BOOKING_URL;
});

const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");

if (mobileMenu && menuToggle) {
  const closeMenu = () => {
    mobileMenu.dataset.open = "false";
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.dataset.open === "true";
    mobileMenu.dataset.open = String(!isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const moduleAccordions = [...document.querySelectorAll(".os-accordion details")];

moduleAccordions.forEach((accordion) => {
  accordion.addEventListener("toggle", () => {
    if (!accordion.open) {
      return;
    }

    moduleAccordions.forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.open = false;
      }
    });
  });
});

const phaseList = document.querySelector(".phase-list");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (phaseList && !reducedMotionQuery.matches && "IntersectionObserver" in window) {
  phaseList.dataset.motion = "ready";

  const phaseObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        phaseList.dataset.motion = "running";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  phaseObserver.observe(phaseList);
}
