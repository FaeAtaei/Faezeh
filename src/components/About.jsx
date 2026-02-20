import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Header from "./Header";

const pageMotion = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.45, ease: "easeIn" }
  }
};

const Shell = styled(motion.main)`
  min-height: 100vh;
  background: #f7f1ec;
  color: #2b221d;
  padding-bottom: 3rem;
`;

const Body = styled.section`
  width: min(1100px, 92vw);
  margin: 2.1rem auto 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 3.2vw, 3.3rem);
  color: #d6522d;
`;

const Text = styled.p`
  margin: 0.8rem 0 0;
  max-width: 66ch;
  line-height: 1.7;
  color: #5a463d;
`;

function About() {
  return (
    <Shell variants={pageMotion} initial="initial" animate="animate" exit="exit">
      <Header light={false} />
      <Body>
        <Title>About</Title>
        <Text>
          Write a short statement about what you build, why it matters, and the type of
          collaborations you want. Keep this section concise, concrete, and aligned with the
          visual direction of your landing page.
        </Text>
      </Body>
    </Shell>
  );
}

export default About;
