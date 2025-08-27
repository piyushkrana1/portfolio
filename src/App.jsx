import React, { useState } from "react";
import Container from "./components/Container";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Resume from "./components/Resume";
import Contact from "./components/Contact";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return <Hero />;
      case "portfolio":
        return <Portfolio />;
      case "resume":
        return <Resume />;
      case "contact":
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "about":
        return "About Me";
      case "portfolio":
        return "Portfolio";
      case "resume":
        return "Resume";
      case "contact":
        return "Contact";
      default:
        return "";
    }
  };

  return (
    <Container activeSection={activeSection} setActiveSection={setActiveSection} sectionTitle={getSectionTitle()}>
      {renderContent()}
    </Container>
  );
}
