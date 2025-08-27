export const projects = [
  {
    id: "ecomm",
    title: "E-commerce Platform",
    role: "Full Stack",
    period: "2024",
    status: "live", // "live" | "case-study" | "code-only" | "prototype" | "private"
    summary: "MERN app with auth, catalog, cart, and checkout. Focused on secure backend and smooth UX.",
    problem: "Small merchants needed a lean storefront with reliable payments and inventory controls.",
    solution: ["JWT auth with RBAC, brute-force protection and rate limiting.", { text: "Payment flow with webhooks (Stripe-like)", href: "#" }, "Catalog search with compound indexes and pagination."],
    architecture: ["Client: React + Redux Toolkit", "API: Node.js + Express (layered services + DTO validation)", { text: "DB: MongoDB schemas + indexes", href: "#" }, "Infra: Docker (dev), NGINX reverse proxy"],
    outcomes: ["Checkout completion +18% vs baseline prototype.", "P95 page load ≈ 1.3s on mid-tier hosting."],
    stack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Docker"],
    media: {
      cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      screenshots: [
        {
          src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
          caption: "Product listing and filters",
        },
        {
          src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
          caption: "Checkout flow & order summary",
          href: "#", // optional deep link or doc
        },
      ],
    },
    links: {
      demo: "https://example.com", // shown if status === "live"
      code: "https://github.com/you/ecomm",
    },
  },

  {
    id: "rag-bot",
    title: "RAG Chatbot",
    role: "AI / Backend",
    period: "2024",
    status: "case-study",
    summary: "Document Q&A bot with embeddings retrieval + grounded generation and citations.",
    problem: "Users needed fast, accurate answers grounded in private docs with clear citations.",
    solution: ["Chunking + embeddings + cosine similarity top-k retrieval.", "Guardrails to reduce hallucinations and include citations.", { text: "Latency budget with async caching & streaming", href: "#" }],
    architecture: ["Ingestion workers (PDF/DOCX parsers).", "Vector DB (or cosine via MongoDB) for retrieval.", "Orchestration in Node/Python with rate limits."],
    outcomes: ["Manual eval: accuracy ↑; P95 latency ≈ 1.8s for 5k docs."],
    stack: ["Python", "LangChain", "Vector DB", "Node.js", "Docker"],
    media: {
      cover: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
      screenshots: [
        {
          src: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1600&auto=format&fit=crop",
          caption: "Answer with citations & source preview",
        },
      ],
    },
    links: {
      // demo omitted
      code: "https://github.com/you/rag-bot", // or omit if private
    },
  },
];
