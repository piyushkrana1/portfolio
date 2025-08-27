import { useCallback, useEffect, useMemo, useState } from "react";

// helper: render list items that can be strings OR {text, href}
function RichList({ items = [] }) {
  return (
    <ul className="mt-2 list-disc pl-5 text-gray-300 space-y-2">
      {items.map((it, i) =>
        typeof it === "string" ? (
          <li key={i}>{it}</li>
        ) : (
          <li key={i}>
            {it.href ? (
              <a className="underline hover:text-yellow-300" href={it.href} target="_blank" rel="noreferrer">
                {it.text}
              </a>
            ) : (
              it.text
            )}
          </li>
        )
      )}
    </ul>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  if (index === null) return null;
  return (
    <div className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center">
      <button onClick={onClose} className="absolute top-6 right-6 text-3xl text-gray-200">
        ×
      </button>
      <button onClick={onPrev} className="absolute left-6 text-3xl text-gray-200">
        ‹
      </button>
      <img src={images[index].src} alt={`screenshot-${index}`} className="max-h-[85vh] max-w-[90vw] object-contain rounded" />
      <button onClick={onNext} className="absolute right-6 text-3xl text-gray-200">
        ›
      </button>
      {images[index].caption && <div className="absolute bottom-6 text-sm text-gray-300 px-3 py-1 bg-black/50 rounded">{images[index].caption}</div>}
    </div>
  );
}

export default function ProjectDetailsOverlay({ project, onClose }) {
  const [lbIndex, setLbIndex] = useState(null);
  const screenshots = useMemo(() => project.media?.screenshots || [], [project]);

  const closeLb = () => setLbIndex(null);
  const prev = useCallback(() => setLbIndex((i) => (i + screenshots.length - 1) % screenshots.length), [screenshots.length]);
  const next = useCallback(() => setLbIndex((i) => (i + 1) % screenshots.length), [screenshots.length]);

  // ESC closes overlay; arrows navigate lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lbIndex !== null) closeLb();
        else onClose();
      }
      if (lbIndex !== null) {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lbIndex, onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      {/* Panel with generous margins & its own scroll */}
      <div
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl
                   overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky header inside the panel */}
        <div className="sticky top-0 z-10 bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-700 px-6 py-4 flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold">{project.title}</h1>
          <span className="text-sm text-yellow-300 font-semibold">
            • {project.role} • {project.period}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {project.links?.demo && project.status === "live" && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded bg-emerald-500 text-emerald-950 font-semibold hover:bg-emerald-400 text-sm">
                Live Demo ↗
              </a>
            )}
            {project.links?.code && (
              <a href={project.links.code} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded bg-neutral-800 text-gray-200 font-semibold hover:bg-neutral-700 text-sm">
                Code
              </a>
            )}
            <button onClick={onClose} className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-gray-200 text-sm">
              Close
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-6">
          {/* Cover */}
          {project.media?.cover && <img src={project.media.cover} alt="cover" className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-lg ring-1 ring-neutral-700" />}

          {/* Summary */}
          <p className="mt-6 text-gray-300">{project.summary}</p>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack?.map((s) => (
              <span key={s} className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-yellow-300">
                {s}
              </span>
            ))}
          </div>

          {/* Sections */}
          <div className="mt-10 grid md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-yellow-400">Overview</h2>
              <p className="mt-3 text-gray-300">{project.summary}</p>
            </div>

            <div className="md:col-span-2 space-y-10">
              <section>
                <h3 className="text-xl font-bold text-white">Problem</h3>
                <p className="mt-2 text-gray-300">{project.problem}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white">Solution</h3>
                <RichList items={project.solution} />
              </section>

              <section>
                <h3 className="text-xl font-bold text-white">Architecture</h3>
                <RichList items={project.architecture} />
              </section>

              {project.outcomes?.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-white">Outcomes</h3>
                  <RichList items={project.outcomes} />
                </section>
              )}
            </div>
          </div>

          {/* Screenshots */}
          {screenshots.length > 0 && (
            <section className="mt-12">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Screenshots</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {screenshots.map((shot, i) => (
                  <figure key={i} className="space-y-2">
                    <button onClick={() => setLbIndex(i)} className="group block rounded-xl overflow-hidden ring-1 ring-neutral-700 hover:ring-neutral-500">
                      <img src={shot.src} alt={shot.caption || `screenshot-${i + 1}`} className="h-56 w-full object-cover group-hover:scale-[1.02] transition" loading="lazy" />
                    </button>
                    <figcaption className="text-xs text-gray-400 flex items-center gap-2">
                      {shot.caption || "Screenshot"}
                      {shot.href && (
                        <a href={shot.href} target="_blank" rel="noreferrer" className="underline hover:text-yellow-300">
                          (open link)
                        </a>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox images={screenshots} index={lbIndex} onClose={closeLb} onPrev={prev} onNext={next} />
    </div>
  );
}
