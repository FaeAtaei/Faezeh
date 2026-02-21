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
    portraitSrc: `${process.env.PUBLIC_URL}/assets/about.jpeg`,
    portraitAlt: "Portrait of Faezeh Ataeizadeh",
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
    bullets: [],
    intro:
      "Hi! My name is Faezeh but most people call ma Fae! I design things that help people think clearly and act intentionally in digital environments.",
    paragraphs: [
      "My background combines quantitative and qualitative research, statistical analysis, and UX Design. I design and run surveys, interviews, and mixed-methods studies, then translate complex findings into practical, actionable insights.",
      "One of my biggest passions in life is art. I live for art and creativity. Art is more than a hobby for me, and I've been expressing myself through it ever since I was a kid. I do both digital and physical art, including sketching, acrylic painting, and embroidery.",
      {
        before: "Oh and I love cats! ",
        quote: "\"They're silly and cuddly and lonely and frightened and brave. Like us!\"",
        url: "https://en.wikipedia.org/wiki/The_Electrical_Life_of_Louis_Wain",
        after: ""
      },
      "I have a kitten named Moochie 🐈"
    ],
    galleryTitle: "My artsy gallary",
    galleryItems: [
      {
        title: "My cluttered brain",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/My%20cluttered%20brain.png`,
        alt: "My cluttered brain artwork by Faezeh Ataeizadeh"
      },
      {
        title: "The Persian girl",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/The%20Persian%20girl.jpg`,
        alt: "The Persian girl artwork by Faezeh Ataeizadeh"
      },
      {
        title: "The boojie cat",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/The%20boojie%20cat.jpg`,
        alt: "The boojie cat artwork by Faezeh Ataeizadeh"
      },
      {
        title: "The lonely",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/The%20lonely.jpg`,
        alt: "The lonely artwork by Faezeh Ataeizadeh"
      },
      {
        title: "The smoking cat",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/The%20smoking%20cat.jpg`,
        alt: "The smoking cat artwork by Faezeh Ataeizadeh"
      },
      {
        title: "IMG 5822",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/IMG_5822.jpg`,
        alt: "Artwork IMG 5822 by Faezeh Ataeizadeh"
      },
      {
        title: "IMG 6746",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/IMG_6746.jpg`,
        alt: "Artwork IMG 6746 by Faezeh Ataeizadeh"
      },
      {
        title: "Cam Photo",
        year: "2024",
        image: `${process.env.PUBLIC_URL}/assets/art%20work/camphoto_1804928587.jpg`,
        alt: "Cam photo artwork by Faezeh Ataeizadeh"
      }
    ]
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
