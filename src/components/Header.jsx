import React from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";

const Shell = styled.header`
  width: min(1100px, 92vw);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  margin: 0 auto;
  padding-top: clamp(1rem, 2vw, 2rem);
  z-index: 2;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 0.45rem;
    justify-items: center;
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => (props.$light ? "rgba(247, 237, 228, 0.9)" : "rgba(34, 26, 22, 0.9)")};
  font-size: clamp(0.8rem, 1vw, 1rem);
  letter-spacing: 0.11em;
  font-weight: 300;
  opacity: 0.72;
  transition: transform 180ms ease, opacity 180ms ease;
  justify-self: center;

  &:hover,
  &.active {
    opacity: 1;
    transform: translateY(-1px);
  }

  &:first-child {
    justify-self: start;
  }

  @media (max-width: 780px) {
    &:first-child {
      justify-self: center;
    }
  }
`;

function Header({ light = true }) {
  const location = useLocation();

  return (
    <Shell>
      <NavItem to="/saetbyeol" className={location.pathname === "/saetbyeol" ? "active" : ""} $light={light}>
        SAETBYEOL
      </NavItem>
      <NavItem to="/projects" className={location.pathname === "/projects" ? "active" : ""} $light={light}>
        PROJECTS
      </NavItem>
      <NavItem to="/about" className={location.pathname === "/about" ? "active" : ""} $light={light}>
        ABOUT
      </NavItem>
    </Shell>
  );
}

export default Header;
