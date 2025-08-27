// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Portfolio from "./sections/Portfolio";
import ProjectDetails from "./sections/ProjectDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans bg-neutral-900 text-white">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Portfolio />
                <section id="resume" className="min-h-screen flex items-center justify-center bg-neutral-900">
                  <h2 className="text-4xl font-bold text-yellow-400">Resume Section</h2>
                </section>
                <section id="contact" className="min-h-screen flex items-center justify-center bg-neutral-900">
                  <h2 className="text-4xl font-bold text-yellow-400">Contact Section</h2>
                </section>
              </>
            }
          />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
