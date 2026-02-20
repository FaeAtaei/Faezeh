import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { FaArrowDown } from "react-icons/fa6";
import Header from "./Header";

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

const Page = styled(motion.main)`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: rgba(247, 237, 228, 0.95);
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(circle at 5% 4%, rgba(0, 0, 0, 0.76), transparent 36%),
    linear-gradient(135deg, #1d0906 0%, #6e2f22 58%, #e7b29d 100%);
`;

const Glow = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(66px);
  mix-blend-mode: screen;
  opacity: 0.75;
  animation: ${drift} ${(props) => props.$duration || "16s"} ease-in-out infinite;
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(255, 242, 231, 0.23) 0,
      rgba(255, 242, 231, 0.23) 1px,
      transparent 2px,
      transparent 4px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.25) 0,
      rgba(0, 0, 0, 0.25) 1px,
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
  width: min(92vw, 760px);
  margin: clamp(3rem, 6vh, 4.5rem) auto 0;
  text-align: center;
`;

const Kicker = styled.p`
  margin: 0 0 1.1rem;
  font-size: clamp(1rem, 1.9vw, 2rem);
  color: rgba(251, 242, 235, 0.86);
  font-weight: 300;
`;

const VennWrap = styled.div`
  position: relative;
  width: min(92vw, 620px);
  aspect-ratio: 1 / 1;
  margin: 0 auto;
`;

const Circle = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 1px dashed rgba(250, 227, 209, 0.66);
  background: rgba(255, 238, 224, 0.07);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;

  &.top {
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
  }

  &.left {
    top: 44%;
    left: 6%;
    transform: translateY(-50%);
  }

  &.right {
    top: 44%;
    right: 6%;
    transform: translateY(-50%);
  }
`;

const LabelBox = styled.div`
  text-align: center;
  transform: translateY(-6%);
`;

const Mini = styled.p`
  margin: 0;
  font-size: clamp(0.68rem, 1vw, 0.82rem);
  letter-spacing: 0.12em;
  font-weight: 400;
  font-family: "Sora", sans-serif;
`;

const Label = styled.p`
  margin: 0.45rem 0 0;
  font-size: clamp(1rem, 2.05vw, 2.15rem);
  font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
  line-height: 1.15;
`;

const VerticalDash = styled.div`
  position: absolute;
  left: 50%;
  top: 48%;
  width: 1px;
  height: 47%;
  transform: translateX(-50%);
  background: repeating-linear-gradient(
    to bottom,
    rgba(248, 224, 206, 0.86) 0,
    rgba(248, 224, 206, 0.86) 7px,
    transparent 7px,
    transparent 14px
  );
`;

const Area = styled.button`
  position: absolute;
  border: 0;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;

  &.a1 {
    top: 24%;
    left: 37%;
    width: 26%;
    height: 21%;
  }
  &.a2 {
    top: 46%;
    left: 26%;
    width: 19%;
    height: 19%;
  }
  &.a3 {
    top: 46%;
    right: 26%;
    width: 19%;
    height: 19%;
  }
  &.a4 {
    top: 39%;
    left: 43%;
    width: 14%;
    height: 14%;
  }
`;

const Name = styled.h1`
  margin: 0;
  font-size: clamp(1.75rem, 3.1vw, 3rem);
  font-weight: 400;
`;

const HoverLine = styled.p`
  min-height: 2.6rem;
  margin: 0.65rem auto 0;
  width: min(92vw, 680px);
  font-size: clamp(0.95rem, 1.35vw, 1.2rem);
  color: rgba(249, 237, 227, 0.86);
`;

const LearnMore = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.45rem;
  border: 1px solid rgba(255, 227, 203, 0.8);
  border-radius: 999px;
  padding: 0.6rem 1.35rem;
  color: rgba(252, 239, 228, 0.94);
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: transform 180ms ease, background-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 234, 216, 0.12);
  }
`;

const Summary = styled.section`
  background: #f7f1ec;
  color: #2f221c;
  padding: clamp(2.4rem, 5vw, 4rem) min(7vw, 5rem);
`;

const SummaryTitle = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 3vw, 3rem);
  font-family: "IBM Plex Mono", monospace;
  color: #d6522d;
`;

const SummaryText = styled.p`
  margin: 0.8rem 0 0;
  max-width: 64ch;
  font-size: clamp(1.05rem, 1.4vw, 1.25rem);
  line-height: 1.6;
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  border: 1px solid rgba(214, 82, 45, 0.28);
  border-radius: 1rem;
  padding: 1.1rem 1rem;
  background: rgba(255, 255, 255, 0.45);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.08rem;
  color: #c34724;
`;

const CardBody = styled.p`
  margin: 0.45rem 0 0;
  color: #59453c;
  line-height: 1.5;
`;

const copyByArea = {
  default: {
    title: "Your Name",
    subtitle: "An artistic systems builder at the intersection of AI, interaction, and social impact."
  },
  a1: {
    title: "Toward Social Justice",
    subtitle: "Design with communities, not just for communities."
  },
  a2: {
    title: "AI + Data",
    subtitle: "Data systems that are accountable, transparent, and humane."
  },
  a3: {
    title: "Scalable Interaction",
    subtitle: "Interfaces that stay intuitive from one user to one million."
  },
  a4: {
    title: "Critical Intersection",
    subtitle: "Human-centered intelligence shaped by equity and interaction."
  }
};

function Landing() {
  const [hovered, setHovered] = useState("default");
  const content = useMemo(() => copyByArea[hovered] || copyByArea.default, [hovered]);

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
              background: "radial-gradient(circle, rgba(255,111,66,0.9) 0%, rgba(255,111,66,0) 70%)"
            }}
            $duration="18s"
          />
          <Glow
            style={{
              width: "48vw",
              height: "48vw",
              right: "-10vw",
              bottom: "-16vw",
              background: "radial-gradient(circle, rgba(255,197,174,0.84) 0%, rgba(255,197,174,0) 70%)"
            }}
            $duration="22s"
          />
          <Glow
            style={{
              width: "40vw",
              height: "40vw",
              left: "18vw",
              top: "8vh",
              background: "radial-gradient(circle, rgba(204,84,48,0.72) 0%, rgba(204,84,48,0) 70%)"
            }}
            $duration="20s"
          />
          <Grain />
        </Backdrop>

        <Header light />
        <Center>
          <Kicker>Explore Intersecting Areas</Kicker>
          <VennWrap>
            <Circle className="top">
              <LabelBox>
                <Mini>TOWARD</Mini>
                <Label>Social Justice</Label>
              </LabelBox>
            </Circle>
            <Circle className="left">
              <LabelBox>
                <Mini>OF</Mini>
                <Label>AI + DATA</Label>
              </LabelBox>
            </Circle>
            <Circle className="right">
              <LabelBox>
                <Mini>BY</Mini>
                <Label>
                  Scalable
                  <br />
                  Interaction
                </Label>
              </LabelBox>
            </Circle>

            <Area
              className="a1"
              aria-label="Toward Social Justice"
              onMouseEnter={() => setHovered("a1")}
              onMouseLeave={() => setHovered("default")}
              onFocus={() => setHovered("a1")}
              onBlur={() => setHovered("default")}
            />
            <Area
              className="a2"
              aria-label="AI and Data area"
              onMouseEnter={() => setHovered("a2")}
              onMouseLeave={() => setHovered("default")}
              onFocus={() => setHovered("a2")}
              onBlur={() => setHovered("default")}
            />
            <Area
              className="a3"
              aria-label="Scalable Interaction area"
              onMouseEnter={() => setHovered("a3")}
              onMouseLeave={() => setHovered("default")}
              onFocus={() => setHovered("a3")}
              onBlur={() => setHovered("default")}
            />
            <Area
              className="a4"
              aria-label="Intersection center"
              onMouseEnter={() => setHovered("a4")}
              onMouseLeave={() => setHovered("default")}
              onFocus={() => setHovered("a4")}
              onBlur={() => setHovered("default")}
            />
            <VerticalDash />
          </VennWrap>

          <Name>{content.title}</Name>
          <HoverLine>{content.subtitle}</HoverLine>
          <LearnMore href="#summary">
            LEARN MORE <FaArrowDown />
          </LearnMore>
        </Center>
      </Page>

      <Summary id="summary">
        <SummaryTitle>Approach Overview</SummaryTitle>
        <SummaryText>
          Build a portfolio where design, research, and engineering overlap. Keep the voice minimal,
          the visuals atmospheric, and each project connected to one clear social or human-centered goal.
        </SummaryText>
        <CardRow>
          <Card>
            <CardTitle>AI + Data</CardTitle>
            <CardBody>Model behavior, fairness checks, and transparent decision interfaces.</CardBody>
          </Card>
          <Card>
            <CardTitle>Scalable Interaction</CardTitle>
            <CardBody>Interaction systems that stay clear across devices and audience sizes.</CardBody>
          </Card>
          <Card>
            <CardTitle>Social Justice</CardTitle>
            <CardBody>Project framing rooted in inclusion, dignity, and measurable impact.</CardBody>
          </Card>
        </CardRow>
      </Summary>
    </>
  );
}

export default Landing;
