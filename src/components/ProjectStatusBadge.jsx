const STYLES = {
  live: "bg-emerald-500 text-emerald-950",
  "case-study": "bg-yellow-400 text-gray-900",
  "code-only": "bg-sky-400 text-sky-950",
  prototype: "bg-violet-400 text-violet-950",
  private: "bg-neutral-500 text-black",
};

const LABELS = {
  live: "Live",
  "case-study": "Case Study",
  "code-only": "Code Only",
  prototype: "Prototype",
  private: "Private/NDA",
};

export default function ProjectStatusBadge({ status = "case-study" }) {
  return <span className={`px-2 py-1 text-xs font-semibold rounded ${STYLES[status] || STYLES["case-study"]}`}>{LABELS[status] || LABELS["case-study"]}</span>;
}
