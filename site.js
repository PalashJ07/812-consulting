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

  const dropdownMenus = {
    "/about/": [
      ["Our Story", "/about/#our-story"],
      ["Our Mission", "/about/#mission"],
      ["What Sets Us Apart", "/about/#pillars"],
      ["Student Experience", "/about/#student-experience"]
    ],
    "/services/": [
      ["Capabilities", "/services/#capabilities"],
      ["Project Model", "/services/#project-model"],
      ["Project Examples", "/services/#project-examples"],
      ["Past Clients", "/services/#clients"],
      ["Our Commitment", "/services/#commitment"]
    ],
    "/members/": [
      ["Executive Board", "/members/#executive-board"],
      ["Full Roster", "/members/#member-directory-title"]
    ],
    "/clients/": [
      ["Why Partner With Us", "/clients/#partner-overview"],
      ["Engagement Example", "/clients/#case-study"],
      ["Client Questions", "/clients/#client-questions"],
      ["Project Inquiry", "/clients/#project-inquiry"]
    ]
  };

  const closeSubmenus = (exception = null) => {
    nav.querySelectorAll(".nav-item.submenu-open").forEach((item) => {
      if (item === exception) return;
      item.classList.remove("submenu-open");
      const button = item.querySelector(".nav-submenu-toggle");
      button?.setAttribute("aria-expanded", "false");
    });
  };

  [...nav.children].forEach((link, index) => {
    if (!(link instanceof HTMLAnchorElement)) return;
    const page = link.getAttribute("href")?.split("#")[0];
    const entries = dropdownMenus[page];
    if (!entries) return;

    const item = document.createElement("div");
    item.className = "nav-item nav-item-has-menu";
    link.before(item);
    item.appendChild(link);

    const menuId = `nav-submenu-${index}`;
    const menu = document.createElement("div");
    menu.className = "nav-submenu";
    menu.id = menuId;

    entries.forEach(([label, href]) => {
      const sublink = document.createElement("a");
      sublink.href = href;
      sublink.textContent = label;
      menu.appendChild(sublink);
    });

    const submenuToggle = document.createElement("button");
    submenuToggle.type = "button";
    submenuToggle.className = "nav-submenu-toggle";
    submenuToggle.setAttribute("aria-controls", menuId);
    submenuToggle.setAttribute("aria-expanded", "false");
    submenuToggle.setAttribute("aria-haspopup", "true");
    submenuToggle.setAttribute("aria-label", `Open ${link.textContent.trim()} menu`);
    submenuToggle.innerHTML = '<span aria-hidden="true"></span>';

    submenuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !item.classList.contains("submenu-open");
      closeSubmenus(item);
      item.classList.toggle("submenu-open", willOpen);
      submenuToggle.setAttribute("aria-expanded", String(willOpen));
      submenuToggle.setAttribute("aria-label", `${willOpen ? "Close" : "Open"} ${link.textContent.trim()} menu`);
    });

    item.append(submenuToggle, menu);
  });

  const setMenuState = (open) => {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  toggle.addEventListener("click", () => {
    closeSubmenus();
    setMenuState(!header.classList.contains("menu-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const openSubmenu = nav.querySelector(".nav-item.submenu-open");
      if (openSubmenu) {
        const submenuToggle = openSubmenu.querySelector(".nav-submenu-toggle");
        closeSubmenus();
        submenuToggle?.focus();
      } else if (header.classList.contains("menu-open")) {
        setMenuState(false);
        toggle.focus();
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeSubmenus();
  });

  window.addEventListener("resize", () => {
    closeSubmenus();
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
