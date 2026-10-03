import Link from "next/link";

const topics = [
  {
    name: "Technology",
    slug: "technology",
    icon: "◈",
    description: "Hardware, software, and the systems we live in.",
    color: "from-green-loki/20 to-surface",
    borderHover: "hover:border-green-bright/50",
    count: 12,
  },
  {
    name: "Programming",
    slug: "programming",
    icon: "⌬",
    description: "Code, patterns, architecture, and craft.",
    color: "from-green-bright/10 to-surface",
    borderHover: "hover:border-green-bright/50",
    count: 24,
  },
  {
    name: "Artificial Intelligence",
    slug: "ai",
    icon: "◎",
    description: "Machine learning, LLMs, and the future of intelligence.",
    color: "from-gold/10 to-surface",
    borderHover: "hover:border-gold/50",
    count: 8,
  },
  {
    name: "Systems",
    slug: "systems",
    icon: "⬡",
    description: "Operating systems, networks, distributed systems.",
    color: "from-surface-raised to-surface",
    borderHover: "hover:border-green-bright/50",
    count: 6,
  },
  {
    name: "Learning",
    slug: "learning",
    icon: "◇",
    description: "Growth, mental models, and the art of getting better.",
    color: "from-green-loki/15 to-surface",
    borderHover: "hover:border-green-bright/50",
    count: 9,
  },
  {
    name: "Thoughts",
    slug: "thoughts",
    icon: "◉",
    description: "Personal reflections, ideas, and observations.",
    color: "from-gold/8 to-surface",
    borderHover: "hover:border-gold/50",
    count: 15,
  },
  {
    name: "Projects",
    slug: "projects",
    icon: "◫",
    description: "Things I build, ship, and learn from.",
    color: "from-green-bright/8 to-surface",
    borderHover: "hover:border-green-bright/50",
    count: 7,
  },
];

export default function TopicsGrid() {
  return (
    <section className="section">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="eyebrow mb-3 block">Explore by topic</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              Explore Topics
            </h2>
          </div>
          <Link
            href="/topics"
            className="text-xs font-semibold tracking-widest uppercase text-green-bright
              flex items-center gap-2 hover:gap-4 transition-all duration-300"
          >
            All Topics <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {topics.map((topic, i) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className={`group relative overflow-hidden rounded-sm border border-border
                bg-gradient-to-br ${topic.color} p-5 flex flex-col gap-3
                transition-all duration-400 ${topic.borderHover}
                hover:shadow-card-hover hover:-translate-y-1`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-green-bright text-2xl leading-none group-hover:scale-110 transition-transform duration-300">
                  {topic.icon}
                </span>
                <span className="text-text-muted/40 text-xs font-mono group-hover:text-green-bright/60 transition-colors duration-300">
                  {String(topic.count).padStart(2, "0")}
                </span>
              </div>

              {/* Name */}
              <h3 className="relative z-10 font-display text-sm font-semibold tracking-wide text-text-primary
                group-hover:text-green-bright transition-colors duration-300">
                {topic.name}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-text-muted text-xs leading-relaxed">
                {topic.description}
              </p>

              {/* Bottom arrow */}
              <div className="relative z-10 mt-auto pt-2 border-t border-border/60">
                <span className="text-[10px] font-mono tracking-widest uppercase text-text-muted/40
                  group-hover:text-green-bright transition-colors duration-300 flex items-center gap-1">
                  Explore <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
