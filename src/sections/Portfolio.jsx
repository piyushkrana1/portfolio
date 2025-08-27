import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectDetailsOverlay from "../components/ProjectDetailsOverlay";

export default function Portfolio() {
  const [active, setActive] = useState(null);

  return (
    <section id="portfolio" className="bg-neutral-900 text-white py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Portfolio</h2>
          <p className="text-gray-400 hidden md:block">
            Case studies and live work across <span className="text-gray-200">Web</span>, <span className="text-gray-200">AI</span>, and <span className="text-gray-200">DevOps</span>.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      {active && <ProjectDetailsOverlay project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
