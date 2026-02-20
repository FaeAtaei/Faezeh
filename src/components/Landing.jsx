import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaArrowDown, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Header from "./Header";
import siteContent from "../content/siteContent";

const palette = {
  cream: "#FAF6E3",
  sage: "#D8DBBD",
  sand: "#B59F78",
  navy: "#2A3663"
};

const pageMotion = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.55, ease: "easeIn" }
  }
};

const drift = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  33% { transform: translate3d(2%, -3%, 0) scale(1.05); }
  66% { transform: translate3d(-3%, 2%, 0) scale(0.98); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const grainShift = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(1.2%, -0.9%); }
  50% { transform: translate(-0.8%, 0.7%); }
  75% { transform: translate(0.4%, -1.1%); }
  100% { transform: translate(0, 0); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled(motion.main)`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: ${palette.cream};
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(circle at 6% 4%, rgba(250, 246, 227, 0.22), transparent 36%),
    linear-gradient(130deg, #1e2950 0%, #2a3663 48%, #b59f78 100%);
`;

const Glow = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  mix-blend-mode: screen;
  opacity: 0.7;
  animation: ${drift} ${(props) => props.$duration || "16s"} ease-in-out infinite;
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.16) 0,
      rgba(255, 255, 255, 0.16) 1px,
      transparent 2px,
      transparent 4px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.22) 0,
      rgba(0, 0, 0, 0.22) 1px,
      transparent 2px,
      transparent 4px
    );
  opacity: 0.17;
  mix-blend-mode: soft-light;
  animation: ${grainShift} 0.6s steps(2) infinite;
`;

const Center = styled.section`
  position: relative;
  z-index: 1;
  width: min(94vw, 900px);
  margin: clamp(1.5rem, 3.5vh, 2.6rem) auto 0;
  text-align: center;
`;

const Kicker = styled.p`
  margin: 0 0 0.7rem;
  font-size: clamp(0.96rem, 1.6vw, 1.5rem);
  color: rgba(250, 246, 227, 0.86);
  font-weight: 300;
`;

const VennWrap = styled.div`
  position: relative;
  width: min(92vw, 760px, 64vh);
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  cursor: default;
`;

const Circle = styled.div`
  position: absolute;
  width: 62%;
  height: 62%;
  border-radius: 50%;
  border: 1px dashed rgba(250, 246, 227, 0.76);

  &.top {
    top: 2.5%;
    left: 50%;
    transform: translateX(-50%);
  }

  &.left {
    top: 35%;
    left: 0;
  }

  &.right {
    top: 35%;
    right: 0;
  }
`;

const LabelBox = styled.div`
  position: absolute;
  text-align: center;
  width: 44%;

  &.top-copy {
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    width: 44%;
  }

  &.left-copy {
    top: 55.8%;
    left: 31%;
    transform: translateX(-50%);
    width: 44%;
  }

  &.right-copy {
    top: 55.8%;
    left: 69%;
    transform: translateX(-50%);
    width: 44%;
  }
`;

const Mini = styled.p`
  margin: 0;
  font-size: clamp(0.74rem, 1.28vh, 0.98rem);
  letter-spacing: 0.04em;
  font-family: "VT323", monospace;
  color: rgba(250, 246, 227, 0.93);
`;

const Label = styled.p`
  margin: 0.35rem 0 0;
  font-size: clamp(1.26rem, 3.35vh, 2.12rem);
  font-family: "VT323", monospace;
  line-height: 1.03;
  letter-spacing: 0.01em;
  white-space: pre;
  word-break: keep-all;
  overflow-wrap: normal;
  color: rgba(250, 246, 227, 0.97);
`;

const VerticalDash = styled.div`
  position: absolute;
  left: 50%;
  top: 47%;
  width: 1px;
  height: 53%;
  transform: translateX(-50%);
  background: repeating-linear-gradient(
    to bottom,
    rgba(250, 246, 227, 0.86) 0,
    rgba(250, 246, 227, 0.86) 7px,
    transparent 7px,
    transparent 14px
  );
`;

const Area = styled.button`
  position: absolute;
  border: 0;
  margin: 0;
  padding: 0;
  border-radius: 999px;
  background: transparent;
  outline: none;

  &.a1 {
    top: 21%;
    left: 33%;
    width: 34%;
    height: 15%;
  }
  &.a2 {
    top: 57%;
    left: 15%;
    width: 34%;
    height: 18%;
  }
  &.a3 {
    top: 57%;
    right: 15%;
    width: 34%;
    height: 18%;
  }
  &.a4 {
    top: 43%;
    left: 41%;
    width: 18%;
    height: 23%;
  }

  @media (hover: hover) and (pointer: fine) {
    cursor: none;
  }

  @media (hover: none), (pointer: coarse) {
    cursor: pointer;
  }
`;

const Name = styled.h1`
  margin: ${(props) =>
      props.$featured ? "clamp(0.2rem, 0.8vh, 0.55rem)" : "clamp(-0.65rem, -1.05vh, -0.25rem)"}
    0 0;
  font-size: ${(props) =>
    props.$featured ? "clamp(1.55rem, 3.3vw, 2.45rem)" : "clamp(1.55rem, 2.8vw, 2.8rem)"};
  font-weight: 400;
  color: ${palette.cream};
`;

const Tagline = styled.p`
  margin: 0.05rem auto 0;
  width: min(92vw, 760px);
  font-size: clamp(0.95rem, 1.4vw, 1.28rem);
  line-height: 1.35;
  color: rgba(250, 246, 227, 0.9);
`;

const HoverLine = styled.p`
  margin: ${(props) => (props.$standalone ? "0.95rem auto 0" : "0.55rem auto 0")};
  width: min(94vw, 980px);
  font-size: ${(props) =>
    props.$standalone
      ? "clamp(1.18rem, 1.85vw, 1.62rem)"
      : "clamp(1.02rem, 1.45vw, 1.38rem)"};
  line-height: 1.35;
  color: rgba(250, 246, 227, 0.88);
`;

const HoverCursor = styled.span`
  position: absolute;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid rgba(250, 246, 227, 0.92);
  transform: translate(-50%, -50%) scale(${(props) => (props.$visible ? 1 : 0.7)});
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: transform 140ms ease, opacity 140ms ease;
  pointer-events: none;
  mix-blend-mode: screen;

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

const LearnMore = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.12rem;
  border: 1px solid rgba(250, 246, 227, 0.85);
  border-radius: 999px;
  padding: 0.48rem 1.1rem;
  font-size: clamp(0.92rem, 1.2vw, 1.04rem);
  color: ${palette.cream};
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: transform 180ms ease, background-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(250, 246, 227, 0.12);
  }
`;

const Section = styled.section`
  padding: clamp(2.4rem, 5vw, 4rem) min(7vw, 5rem);
  animation: ${fadeInUp} 700ms ease both;
`;

const AboutSection = styled(Section)`
  background: ${palette.cream};
  color: ${palette.navy};
`;

const ProjectsSection = styled(Section)`
  background: ${palette.sage};
  color: ${palette.navy};
`;

const ContactSection = styled(Section)`
  background: ${palette.cream};
  color: ${palette.navy};
  padding-bottom: clamp(3rem, 7vw, 5rem);
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 3vw, 3rem);
  font-family: "IBM Plex Mono", monospace;
  color: ${palette.navy};
`;

const SectionText = styled.p`
  margin: 0.8rem 0 0;
  max-width: 70ch;
  line-height: 1.65;
  color: rgba(42, 54, 99, 0.92);
  font-size: clamp(1.02rem, 1.25vw, 1.2rem);
`;

const AboutGrid = styled.div`
  margin-top: 1.3rem;
  display: grid;
  grid-template-columns: minmax(0, 390px) 1fr;
  gap: 1.2rem;
  align-items: start;

  @media (max-width: 930px) {
    grid-template-columns: 1fr;
  }
`;

const PortraitCard = styled.figure`
  margin: 0;
  background: rgba(216, 219, 189, 0.5);
  border: 1px solid rgba(42, 54, 99, 0.26);
  border-radius: 1rem;
  padding: 0.75rem;
`;

const PortraitImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  border-radius: 0.7rem;
  background: #e8ebd2;
`;

const PortraitFallback = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  text-align: center;
  border-radius: 0.7rem;
  background: #e8ebd2;
  color: rgba(42, 54, 99, 0.88);
  padding: 1rem;
  font-size: 0.95rem;
`;

const PortraitCaption = styled.figcaption`
  margin-top: 0.55rem;
  color: rgba(42, 54, 99, 0.8);
  font-size: 0.9rem;
`;

const AboutCopy = styled.div`
  min-width: 0;
`;

const BulletList = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const Bullet = styled.span`
  border: 1px solid rgba(42, 54, 99, 0.28);
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  font-size: 0.9rem;
  color: ${palette.navy};
  background: rgba(250, 246, 227, 0.7);
`;

const ProjectGrid = styled.div`
  margin-top: 1.35rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 950px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 740px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article`
  border: 1px solid rgba(42, 54, 99, 0.26);
  border-radius: 1rem;
  padding: 1.1rem 1rem;
  background: rgba(250, 246, 227, 0.75);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ProjectTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.8rem;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 1.08rem;
  color: ${palette.navy};
`;

const ProjectYear = styled.span`
  font-size: 0.84rem;
  letter-spacing: 0.06em;
  color: rgba(42, 54, 99, 0.72);
`;

const ProjectBody = styled.p`
  margin: 0;
  color: rgba(42, 54, 99, 0.92);
  line-height: 1.5;
  font-size: 0.98rem;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Tag = styled.span`
  border: 1px solid rgba(42, 54, 99, 0.26);
  border-radius: 999px;
  padding: 0.28rem 0.6rem;
  font-size: 0.78rem;
  color: ${palette.navy};
  background: rgba(216, 219, 189, 0.35);
`;

const ProjectLink = styled.a`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  color: ${(props) => (props.$disabled ? "rgba(42, 54, 99, 0.62)" : palette.navy)};
  text-decoration: none;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(42, 54, 99, 0.35);
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

  &:hover {
    color: ${palette.sand};
  }
`;

const ContactLinks = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ContactLink = styled.a`
  color: ${palette.navy};
  text-decoration: none;
  border: 1px solid rgba(42, 54, 99, 0.4);
  border-radius: 999px;
  padding: 0.48rem 0.9rem;
  background: rgba(216, 219, 189, 0.42);
  transition: transform 140ms ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

function Landing() {
  const location = useLocation();
  const [hovered, setHovered] = useState("default");
  const [portraitLoadError, setPortraitLoadError] = useState(false);

  const content = useMemo(
    () => siteContent.hoverContent[hovered] || siteContent.hoverContent.default,
    [hovered]
  );
  const showTitle = Boolean(content.title);
  const showSubtitle = Boolean(content.subtitle);
  const isIntersection = hovered === "a4";

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [location.hash]);

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false
  });

  const handleWrapMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor((prev) => ({
      ...prev,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }));
  };

  const activateArea = (key) => {
    setHovered(key);
    setCursor((prev) => ({ ...prev, visible: true }));
  };

  const deactivateArea = () => {
    setHovered("default");
    setCursor((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      <Page variants={pageMotion} initial="initial" animate="animate" exit="exit">
        <Backdrop>
          <Glow
            style={{
              width: "56vw",
              height: "56vw",
              left: "-12vw",
              bottom: "-12vw",
              background: "radial-gradient(circle, rgba(216,219,189,0.64) 0%, rgba(216,219,189,0) 70%)"
            }}
            $duration="18s"
          />
          <Glow
            style={{
              width: "48vw",
              height: "48vw",
              right: "-10vw",
              bottom: "-16vw",
              background: "radial-gradient(circle, rgba(181,159,120,0.78) 0%, rgba(181,159,120,0) 70%)"
            }}
            $duration="22s"
          />
          <Glow
            style={{
              width: "40vw",
              height: "40vw",
              left: "18vw",
              top: "8vh",
              background: "radial-gradient(circle, rgba(42,54,99,0.65) 0%, rgba(42,54,99,0) 70%)"
            }}
            $duration="20s"
          />
          <Grain />
        </Backdrop>

        <Header light />
        <Center id="top">
          <Kicker>{siteContent.hero.kicker}</Kicker>
          <VennWrap onMouseMove={handleWrapMove} onMouseLeave={deactivateArea}>
            <Circle className="top">
              <LabelBox className="top-copy">
                <Mini>{siteContent.hero.circles.top.mini}</Mini>
                <Label $variant="top">{siteContent.hero.circles.top.label}</Label>
              </LabelBox>
            </Circle>
            <Circle className="left">
              <LabelBox className="left-copy">
                <Mini>{siteContent.hero.circles.left.mini}</Mini>
                <Label $variant="side">{siteContent.hero.circles.left.label}</Label>
              </LabelBox>
            </Circle>
            <Circle className="right">
              <LabelBox className="right-copy">
                <Mini>{siteContent.hero.circles.right.mini}</Mini>
                <Label $variant="side">{siteContent.hero.circles.right.label}</Label>
              </LabelBox>
            </Circle>

            <Area
              className="a1"
              aria-label="Toward area"
              onMouseEnter={() => activateArea("a1")}
              onMouseLeave={deactivateArea}
              onFocus={() => setHovered("a1")}
              onBlur={() => setHovered("default")}
            />
            <Area
              className="a2"
              aria-label="Of area"
              onMouseEnter={() => activateArea("a2")}
              onMouseLeave={deactivateArea}
              onFocus={() => setHovered("a2")}
              onBlur={() => setHovered("default")}
            />
            <Area
              className="a3"
              aria-label="By area"
              onMouseEnter={() => activateArea("a3")}
              onMouseLeave={deactivateArea}
              onFocus={() => setHovered("a3")}
              onBlur={() => setHovered("default")}
            />
            <Area
              className="a4"
              aria-label="Intersection area"
              onMouseEnter={() => activateArea("a4")}
              onMouseLeave={deactivateArea}
              onFocus={() => setHovered("a4")}
              onBlur={() => setHovered("default")}
            />
            <VerticalDash />
            <HoverCursor
              aria-hidden="true"
              $visible={cursor.visible}
              style={{
                left: `${cursor.x}px`,
                top: `${cursor.y}px`
              }}
            />
          </VennWrap>

          {showTitle ? <Name $featured={isIntersection}>{content.title}</Name> : null}
          {hovered === "default" && siteContent.hero.tagline ? (
            <Tagline>{siteContent.hero.tagline}</Tagline>
          ) : null}
          {showSubtitle ? (
            <HoverLine $standalone={!showTitle}>{content.subtitle}</HoverLine>
          ) : null}
          <LearnMore href="#about">
            {siteContent.hero.ctaLabel} <FaArrowDown />
          </LearnMore>
        </Center>
      </Page>

      <AboutSection id="about">
        <SectionTitle>{siteContent.about.title}</SectionTitle>
        <AboutGrid>
          <PortraitCard>
            {portraitLoadError ? (
              <PortraitFallback>
                Portrait image failed to load.
              </PortraitFallback>
            ) : (
              <PortraitImage
                src={siteContent.about.portraitSrc}
                alt={siteContent.about.portraitAlt}
                onError={() => setPortraitLoadError(true)}
              />
            )}
            {siteContent.about.portraitCaption ? (
              <PortraitCaption>{siteContent.about.portraitCaption}</PortraitCaption>
            ) : null}
          </PortraitCard>

          <AboutCopy>
            <SectionText>{siteContent.about.intro}</SectionText>
            {siteContent.about.paragraphs.map((paragraph) => (
              <SectionText key={paragraph}>{paragraph}</SectionText>
            ))}
            {siteContent.about.bullets.length > 0 ? (
              <BulletList>
                {siteContent.about.bullets.map((bullet) => (
                  <Bullet key={bullet}>{bullet}</Bullet>
                ))}
              </BulletList>
            ) : null}
          </AboutCopy>
        </AboutGrid>
      </AboutSection>

      <ProjectsSection id="projects">
        <SectionTitle>{siteContent.projects.title}</SectionTitle>
        <SectionText>{siteContent.projects.intro}</SectionText>
        <ProjectGrid>
          {siteContent.projects.items.map((project) => {
            const isLive = Boolean(project.link && project.link !== "#");
            return (
              <ProjectCard key={`${project.title}-${project.year}`}>
                <ProjectTitleRow>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectYear>{project.year}</ProjectYear>
                </ProjectTitleRow>
                <ProjectBody>{project.description}</ProjectBody>
                <TagRow>
                  {project.tags.map((tag) => (
                    <Tag key={`${project.title}-${tag}`}>{tag}</Tag>
                  ))}
                </TagRow>
                <ProjectLink
                  href={isLive ? project.link : undefined}
                  target={isLive ? "_blank" : undefined}
                  rel={isLive ? "noreferrer" : undefined}
                  $disabled={!isLive}
                >
                  {isLive ? "View Project" : "Coming Soon"} <FaArrowUpRightFromSquare />
                </ProjectLink>
              </ProjectCard>
            );
          })}
        </ProjectGrid>
      </ProjectsSection>

      <ContactSection id="contact">
        <SectionTitle>{siteContent.contact.title}</SectionTitle>
        <SectionText>{siteContent.contact.subtitle}</SectionText>
        <SectionText>
          Email: <strong>{siteContent.contact.email}</strong>
        </SectionText>
        <ContactLinks>
          {siteContent.contact.links.map((link) => (
            <ContactLink key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </ContactLink>
          ))}
        </ContactLinks>
      </ContactSection>
    </>
  );
}

export default Landing;
