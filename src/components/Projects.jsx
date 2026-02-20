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
  color: #2f221c;
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

const Intro = styled.p`
  margin: 0.7rem 0 0;
  max-width: 58ch;
  line-height: 1.65;
  color: #5c473f;
`;

const Grid = styled.div`
  margin-top: 1.45rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.article`
  border: 1px solid rgba(214, 82, 45, 0.28);
  border-radius: 1rem;
  padding: 1.1rem;
  background: rgba(255, 255, 255, 0.5);
`;

const ItemName = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  color: #be4421;
`;

const ItemDesc = styled.p`
  margin: 0.4rem 0 0;
  line-height: 1.55;
  color: #634f46;
`;

function Projects() {
  return (
    <Shell variants={pageMotion} initial="initial" animate="animate" exit="exit">
      <Header light={false} />
      <Body>
        <Title>Projects</Title>
        <Intro>
          Replace this with your real case studies. Keep each project short, visual, and connected
          to a clear design or research question.
        </Intro>
        <Grid>
          <Item>
            <ItemName>Project 01</ItemName>
            <ItemDesc>AI-assisted storytelling for underrepresented community narratives.</ItemDesc>
          </Item>
          <Item>
            <ItemName>Project 02</ItemName>
            <ItemDesc>Immersive interaction prototype for participatory public feedback.</ItemDesc>
          </Item>
          <Item>
            <ItemName>Project 03</ItemName>
            <ItemDesc>Responsible recommendation system with transparency controls.</ItemDesc>
          </Item>
          <Item>
            <ItemName>Project 04</ItemName>
            <ItemDesc>Assistive interface toolkit designed with accessibility-first constraints.</ItemDesc>
          </Item>
        </Grid>
      </Body>
    </Shell>
  );
}

export default Projects;
