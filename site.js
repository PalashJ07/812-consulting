document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const nav = header?.querySelector(".nav-links");
const navWrap = header?.querySelector(".nav-wrap");

if (header && nav && navWrap) {
  nav.id = nav.id || "primary-navigation";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-controls", nav.id);
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
  toggle.innerHTML = `
    <span class="nav-toggle-line" aria-hidden="true"></span>
    <span class="nav-toggle-line" aria-hidden="true"></span>
    <span class="nav-toggle-line" aria-hidden="true"></span>
  `;
  navWrap.insertBefore(toggle, nav);

  const setMenuState = (open) => {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  toggle.addEventListener("click", () => {
    setMenuState(!header.classList.contains("menu-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("menu-open")) {
      setMenuState(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) setMenuState(false);
  });
}

const revealTargets = document.querySelectorAll(
  "main section:not(.hero):not(.page-hero):not(.members-section):not(.contact-page-intro):not(.contact-page-form-section), .service-card, .info-card, .timeline-card, .post-card, .model-stat, .about-stat, details, .photo-frame, .join-panel, .contact-card, .quote-panel"
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
