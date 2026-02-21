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
    sentences: [
      "I research how people make decisions.",
      "I study behavior within digital systems.",
      "I work with both quantitative and qualitative data.",
      "I design and run studies to uncover patterns and insights.",
      "I use Python for analysis and statistical modeling.",
      "I build interfaces using HTML, CSS, and JavaScript.",
      "I design wireframes and prototypes in Figma.",
      "I translate research into clear, actionable outcomes."
    ],
    bullets: []
  },
  projects: {
    title: "Selected Projects",
    intro: "",
    moreLabel: "View More Projects",
    moreLink: "#",
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
    email: "faezehataeizadeh@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/FaeAtaei" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/faezeh-ataeizadeh-a4a63314a/"
      }
    ]
  }
};

export default siteContent;
