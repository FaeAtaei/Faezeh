import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import siteContent from "../content/siteContent";

const Shell = styled.header`
  width: min(1100px, 92vw);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  padding-top: clamp(1rem, 2vw, 2rem);
  z-index: 2;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 0.45rem;
    justify-items: center;
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.$light ? "rgba(247, 237, 228, 0.9)" : "rgba(34, 26, 22, 0.9)")};
  font-size: clamp(0.8rem, 1vw, 1rem);
  letter-spacing: 0.11em;
  font-weight: 300;
  opacity: 0.72;
  transition: transform 180ms ease, opacity 180ms ease;

  &:hover,
  &.active {
    opacity: 1;
    transform: translateY(-1px);
  }
`;

function Header({ light = true }) {
  const location = useLocation();
  const isLanding = location.pathname === "/saetbyeol";
  const isProjects = location.hash === "#projects";
  const isAbout = location.hash === "#about";

  return (
    <Shell>
      <NavItem to="/saetbyeol" className={isLanding && !location.hash ? "active" : ""} $light={light}>
        {siteContent.brand}
      </NavItem>
      <NavItem to="/saetbyeol#projects" className={isProjects ? "active" : ""} $light={light}>
        PROJECTS
      </NavItem>
      <NavItem to="/saetbyeol#about" className={isAbout ? "active" : ""} $light={light}>
        ABOUT
      </NavItem>
    </Shell>
  );
}

export default Header;
