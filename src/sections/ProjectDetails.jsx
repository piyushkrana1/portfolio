import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

function useProject(id) {
  return useMemo(() => projects.find((p) => p.id === id), [id]);
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  if (index === null) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center">
      <button className="absolute top-5 right-6 text-gray-300 hover:text-white text-3xl" onClick={onClose} aria-label="Close">
        ×
      </button>
      <button className="absolute left-4 md:left-8 text-gray-300 hover:text-white text-3xl px-3 py-2" onClick={onPrev} aria-label="Previous">
        ‹
      </button>
      <img src={images[index]} alt={`screenshot-${index + 1}`} className="max-h-[85vh] max-w-[92vw] object-contain rounded-lg shadow-2xl" />
      <button className="absolute right-4 md:right-8 text-gray-300 hover:text-white text-3xl px-3 py-2" onClick={onNext} aria-label="Next">
        ›
      </button>
      <div className="absolute bottom-6 text-sm text-gray-400">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const project = useProject(id);
  const nav = useNavigate();

  const [lbIndex, setLbIndex] = useState(null);

  const close = () => setLbIndex(null);
  const prev = useCallback(() => {
    setLbIndex((i) => (i === null ? null : (i + project.media.screenshots.length - 1) % project.media.screenshots.length));
  }, [project]);
  const next = useCallback(() => {
    setLbIndex((i) => (i === null ? null : (i + 1) % project.media.screenshots.length));
  }, [project]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [id, prev, next]);

  if (!project) {
    return (
      <section className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-6">Project not found.</p>
          <button onClick={() => nav("/")} className="px-4 py-2 bg-yellow-400 text-gray-900 rounded font-semibold">
            Go Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="bg-neutral-900 text-white">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-14">
          <Link to="/" className="text-gray-400 hover:text-white text-sm">
            ← Back
          </Link>
          <div className="mt-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{project.title}</h1>
              <p className="mt-3 text-yellow-300 font-semibold">
                {project.role} • {project.period}
              </p>
              <p className="mt-5 text-gray-300">{project.summary}</p>

              {/* CTAs */}
              <div className="mt-6 flex gap-4">
                {project.links?.demo && project.status === "live" && (
                  <a className="px-4 py-2 rounded bg-emerald-500 text-emerald-950 font-semibold hover:bg-emerald-400" href={project.links.demo} target="_blank" rel="noreferrer">
                    Live Demo ↗
                  </a>
                )}
                {project.links?.code && (
                  <a className="px-4 py-2 rounded bg-neutral-800 text-gray-200 font-semibold hover:bg-neutral-700" href={project.links.code} target="_blank" rel="noreferrer">
                    Code
                  </a>
                )}
              </div>
            </div>

            <div>
              <img src={project.media?.cover || project.media?.screenshots?.[0]} alt="hero" className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl ring-1 ring-neutral-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Sidebar Summary */}
          <aside className="md:col-span-1">
            <h2 className="text-2xl font-bold text-yellow-400">Overview</h2>
            <p className="mt-3 text-gray-300">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-yellow-300">
                  {s}
                </span>
              ))}
            </div>
          </aside>

          {/* Main sections */}
          <div className="md:col-span-2 space-y-10">
            <section>
              <h3 className="text-xl font-bold text-white">Problem</h3>
              <p className="mt-2 text-gray-300">{project.problem}</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white">Solution</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-300 space-y-2">
                {project.solution.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white">Architecture</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-300 space-y-2">
                {project.architecture.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>

            {project.outcomes?.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-white">Outcomes</h3>
                <ul className="mt-2 list-disc pl-5 text-gray-300 space-y-2">
                  {project.outcomes.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Screenshot gallery */}
        {project.media?.screenshots?.length > 0 && (
          <section className="mt-16">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">Screenshots</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.media.screenshots.map((src, i) => (
                <button key={i} onClick={() => setLbIndex(i)} className="group relative rounded-xl overflow-hidden ring-1 ring-neutral-700 hover:ring-neutral-500">
                  <img src={src} alt={`screenshot-${i + 1}`} className="h-48 w-full object-cover group-hover:scale-[1.02] transition" loading="lazy" />
                  <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-gray-200 px-2 py-0.5 rounded">View</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Lightbox */}
      <Lightbox images={project.media?.screenshots || []} index={lbIndex} onClose={close} onPrev={prev} onNext={next} />
    </main>
  );
}
