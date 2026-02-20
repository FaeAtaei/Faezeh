import React from "react";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import Landing from "./components/Landing";
import ScrollToTop from "./components/ScrollToTop";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/saetbyeol" replace />} />
        <Route path="/saetbyeol" element={<Landing />} />
        <Route path="/projects" element={<Navigate to="/saetbyeol#projects" replace />} />
        <Route path="/about" element={<Navigate to="/saetbyeol#about" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
