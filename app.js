const projectDetails = {
  noor: {
    kicker: "App Concept",
    title: "Noor",
    body:
      "Noor is a healing-focused interactive app concept with guided reflection, emotional stage-based navigation, and lightweight community support.",
    points: [
      "Designed around five emotional worlds with progressive unlock logic.",
      "Includes journaling, prompts, and reflection activities.",
      "Built as a responsive web experience for GitHub Pages.",
    ],
  },
  lunedor: {
    kicker: "App Concept",
    title: "Lunedor",
    body:
      "Lunedor is a period-tracking concept focused on calm UX, pattern insights, and accessible health data presentation.",
    points: [
      "Cycle logging with simple, low-friction interaction.",
      "Insight summaries to support body-awareness habits.",
      "Visual language tailored for clarity and emotional comfort.",
    ],
  },
  govux: {
    kicker: "Research Project",
    title: "Government Website Redesign",
    body:
      "A UX research project analyzing administrative burden and trust in government digital systems, then translating findings into redesign opportunities.",
    points: [
      "Interview synthesis and citizen journey mapping.",
      "Navigation and accessibility pain-point analysis.",
      "Service blueprint and information architecture recommendations.",
    ],
  },
};

const elements = {
  menuToggle: document.getElementById("menu-toggle"),
  siteNav: document.getElementById("site-nav"),
  navLinks: Array.from(document.querySelectorAll(".site-nav a")),
  revealBlocks: Array.from(document.querySelectorAll("[data-reveal]")),
  filterButtons: Array.from(document.querySelectorAll(".filter-btn")),
  projectCards: Array.from(document.querySelectorAll(".project-card")),
  detailButtons: Array.from(document.querySelectorAll("[data-project]")),
  dialog: document.getElementById("project-dialog"),
  dialogClose: document.getElementById("dialog-close"),
  dialogKicker: document.getElementById("dialog-kicker"),
  dialogTitle: document.getElementById("dialog-title"),
  dialogBody: document.getElementById("dialog-body"),
  dialogPoints: document.getElementById("dialog-points"),
  sections: Array.from(document.querySelectorAll("main section[id]")),
};

initialize();

function initialize() {
  wireMenu();
  wireReveal();
  wireFilters();
  wireProjectDialog();
  wireSectionSpy();
  registerServiceWorker();
}

function wireMenu() {
  if (!elements.menuToggle || !elements.siteNav) return;

  elements.menuToggle.addEventListener("click", () => {
    const isOpen = elements.siteNav.classList.toggle("open");
    elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  elements.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      elements.siteNav.classList.remove("open");
      elements.menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    const insideMenu = elements.siteNav.contains(target);
    const onToggle = elements.menuToggle.contains(target);
    if (!insideMenu && !onToggle) {
      elements.siteNav.classList.remove("open");
      elements.menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function wireReveal() {
  if (!("IntersectionObserver" in window)) {
    elements.revealBlocks.forEach((block) => block.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  elements.revealBlocks.forEach((block, index) => {
    block.style.transitionDelay = `${Math.min(index * 80, 300)}ms`;
    observer.observe(block);
  });
}

function wireFilters() {
  elements.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      elements.filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      elements.projectCards.forEach((card) => {
        const category = card.dataset.category || "";
        const visible = filter === "all" || category === filter;
        card.classList.toggle("hidden", !visible);
      });
    });
  });
}

function wireProjectDialog() {
  if (!elements.dialog) return;

  elements.detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.project;
      if (!key) return;
      openProjectDialog(key);
    });
  });

  elements.dialogClose?.addEventListener("click", closeProjectDialog);

  elements.dialog.addEventListener("click", (event) => {
    const rect = elements.dialog.getBoundingClientRect();
    const insideDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!insideDialog) {
      closeProjectDialog();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeProjectDialog();
  });
}

function openProjectDialog(projectKey) {
  const project = projectDetails[projectKey];
  if (!project || !elements.dialog) return;

  elements.dialogKicker.textContent = project.kicker;
  elements.dialogTitle.textContent = project.title;
  elements.dialogBody.textContent = project.body;

  elements.dialogPoints.innerHTML = "";
  project.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    elements.dialogPoints.appendChild(li);
  });

  if (!elements.dialog.open) {
    elements.dialog.showModal();
    document.body.style.overflow = "hidden";
  }
}

function closeProjectDialog() {
  if (!elements.dialog?.open) return;
  elements.dialog.close();
  document.body.style.overflow = "";
}

function wireSectionSpy() {
  if (!("IntersectionObserver" in window) || !elements.sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        elements.navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", active);
        });
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-20% 0px -45% 0px",
    }
  );

  elements.sections.forEach((section) => observer.observe(section));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
