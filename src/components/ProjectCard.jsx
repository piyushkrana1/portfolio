export default function ProjectCard({ p, onOpen }) {
  return (
    <article className="group bg-neutral-800/80 border border-neutral-700/60 rounded-xl overflow-hidden shadow hover:shadow-yellow-500/10 hover:border-neutral-600 transition cursor-pointer" onClick={onOpen} aria-label={`Open details for ${p.title}`} role="button">
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img src={p.media?.cover} alt={p.title} className="h-full w-full object-cover transform group-hover:scale-[1.03] transition" loading="lazy" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-400 text-gray-900">{p.status === "live" ? "Live" : p.status === "case-study" ? "Case Study" : p.status}</span>
          {p.role && <span className="px-2 py-1 text-xs font-semibold bg-neutral-900/70 text-gray-200 rounded">{p.role}</span>}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{p.title}</h3>
        <p className="text-sm text-gray-300 mt-2">{p.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack?.map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs rounded bg-neutral-700 text-yellow-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
