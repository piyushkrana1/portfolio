// Portfolio.jsx
import React, { useState, useMemo } from "react";
import useProjects from "../hooks/useProjects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiArrowLeft, FiExternalLink, FiPlay, FiCode, FiCheckCircle } from "react-icons/fi";

export default function Portfolio() {
  const { projects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-10 py-6 md:py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Projects</h1>

      {loading && <SkeletonGrid />}
      {error && <p className="text-red-400">Failed to load projects. {String(error.message || error)}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((proj) => (
            <article
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="
                group cursor-pointer rounded-2xl overflow-hidden
                border border-gray-800 bg-gray-900/70
                hover:border-[hsl(var(--accent))]/70 transition
                flex flex-col
              "
            >
              {proj.media?.cover && (
                <div className="relative h-40 md:h-48 overflow-hidden">
                  <img src={proj.media.cover} alt={proj.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
              )}

              <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
                <header className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-white">{proj.title}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {proj.role && <MetaPill>{proj.role}</MetaPill>}
                      {proj.period && <MetaPill>{proj.period}</MetaPill>}
                      <StatusPill status={proj.status} />
                    </div>
                  </div>
                </header>

                {proj.summary && <p className="text-gray-300 text-sm leading-relaxed">{proj.summary}</p>}

                {Array.isArray(proj.stack) && proj.stack.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {proj.stack.slice(0, 8).map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* ======= Detail View (unchanged except markdown/links remain) ======= */

function ProjectDetail({ project, onBack }) {
  const hasLinks = useMemo(() => Boolean(project.links?.demo || project.links?.code), [project]);

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-10 py-6 md:py-10">
      <div className="flex items-center justify-between gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-[hsl(var(--accent))] hover:underline text-sm md:text-base">
          <FiArrowLeft /> Back to Projects
        </button>
      </div>

      <header className="mt-3 md:mt-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white">{project.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {project.role && <MetaPill>{project.role}</MetaPill>}
          {project.period && <MetaPill>{project.period}</MetaPill>}
          <StatusPill status={project.status} />
        </div>
        {project.summary && <p className="mt-4 text-gray-300">{project.summary}</p>}
        {Array.isArray(project.stack) && project.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        )}
      </header>

      {project.markdown && (
        <div
          className="mt-8 prose prose-invert max-w-none
                     prose-headings:text-white
                     prose-a:text-[hsl(var(--accent))] prose-a:no-underline hover:prose-a:underline
                     prose-hr:border-gray-800
                     prose-strong:text-white
                     prose-code:bg-gray-800/60 prose-code:text-white prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                     prose-li:marker:text-[hsl(var(--accent))]"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.markdown}</ReactMarkdown>
        </div>
      )}

      {hasLinks && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-[hsl(var(--accent))]
                text-[hsl(var(--accent))]
                hover:bg-[hsl(var(--accent))] hover:text-white
                transition
              "
            >
              <FiPlay /> Live Demo
            </a>
          )}
          {project.links?.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-[hsl(var(--accent))]
                text-[hsl(var(--accent))]
                hover:bg-[hsl(var(--accent))] hover:text-white
                transition
              "
            >
              <FiCode /> Source Code
            </a>
          )}
        </div>
      )}
    </section>
  );
}

/* ======= UI bits (same as before) ======= */

function Chip({ children }) {
  return (
    <span
      className="
        text-xs px-2.5 py-1 rounded-md
        border border-[hsl(var(--accent))]/60
        text-[hsl(var(--accent))]
        bg-transparent
      "
    >
      {children}
    </span>
  );
}

function MetaPill({ children }) {
  return <span className="text-xs md:text-sm px-2.5 py-1 rounded-md border border-gray-700 text-gray-300 bg-gray-900/60">{children}</span>;
}

function StatusPill({ status }) {
  if (!status) return null;
  const isLive = status === "live";
  return (
    <span className={["inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md", isLive ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/15 text-amber-300 border border-amber-500/30"].join(" ")} title={status}>
      <FiCheckCircle className="text-sm" />
      {isLive ? "Live" : "Case Study"}
    </span>
  );
}

/* Optional skeletons for loading */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/60 animate-pulse">
          <div className="h-40 md:h-48 bg-gray-800/70" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-1/2 bg-gray-800 rounded" />
            <div className="h-3 w-3/4 bg-gray-800 rounded" />
            <div className="h-3 w-2/3 bg-gray-800 rounded" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-14 bg-gray-800 rounded" />
              <div className="h-6 w-20 bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
