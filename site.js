document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const revealTargets = document.querySelectorAll(
  "main section:not(.hero):not(.page-hero), .service-card, .info-card, .timeline-card, .post-card, .model-stat, .about-stat, details, .photo-frame, .join-panel, .contact-card, .quote-panel"
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
