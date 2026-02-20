import faezehPortrait from "../assets/faezeh.png";

const siteContent = {
  brand: "FAEZEH",
  hero: {
    kicker: "Explore Intersecting Areas",
    circles: {
      top: { mini: "Toward:", label: "Better Decisions" },
      left: { mini: "Of:", label: "People +\nDigital Systems" },
      right: { mini: "By:", label: "Research +\nCreative Tech" }
    },
    tagline: "A Product Designer and HCI researcher based in Canada",
    ctaLabel: "LEARN MORE"
  },
  hoverContent: {
    default: {
      title: "Faezeh Ataeizadeh",
      subtitle: ""
    },
    a1: {
      title: "",
      subtitle:
        "How do we build digital systems that enhance human agency rather than automate it away?"
    },
    a2: {
      title: "",
      subtitle:
        "How do digital environments reshape attention, motivation, and social norms over time?"
    },
    a3: {
      title: "",
      subtitle:
        "How can complex data be translated into experiences that change how people think and act?"
    },
    a4: {
      title: "",
      subtitle: "Use technology as a medium for empathy, equity, and access."
    }
  },
  about: {
    title: "About",
    portraitSrc: faezehPortrait,
    portraitAlt: "Portrait of Faezeh Ataeizadeh",
    portraitCaption: "",
    intro: "I want to design things that help people think clearly.",
    paragraphs: [
      "Tools that reduce noise instead of adding to it.",
      "Experiences that make complex systems visible.",
      "Fewer, better digital things.",
      "An intentional use of technology.",
      "Better decisions by design."
    ],
    bullets: []
  },
  projects: {
    title: "Selected Projects",
    intro: "Add your own projects below. Keep each one short, visual, and impact-focused.",
    items: [
      {
        title: "Project One",
        year: "2026",
        description: "A speculative interface exploring how memory, identity, and AI can coexist in public space.",
        tags: ["AI", "UX", "Research"],
        link: "#"
      },
      {
        title: "Project Two",
        year: "2025",
        description: "A multi-sensory web experience using animation and narrative to communicate social data.",
        tags: ["Data", "Storytelling", "Web"],
        link: "#"
      },
      {
        title: "Project Three",
        year: "2024",
        description: "An interactive tool designed to make complex systems easier to understand for non-experts.",
        tags: ["Education", "Interaction", "Design"],
        link: "#"
      }
    ]
  },
  contact: {
    title: "Contact",
    subtitle: "Open to collaborations, research, and creative technology work.",
    email: "youremail@example.com",
    links: [
      { label: "GitHub", url: "https://github.com/FaeAtaei" },
      { label: "LinkedIn", url: "https://www.linkedin.com" }
    ]
  }
};

export default siteContent;
