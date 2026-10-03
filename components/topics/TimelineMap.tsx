"use client";

import { motion } from "framer-motion";
import { useTimeTravel } from "@/components/context/TimeTravelContext";

interface TimelineNode {
  id: string;
  label: string;
  slug: string;
  count: number;
  x: number;
  y: number;
  children?: string[];
}

interface TimelineMapProps {
  timelines: { id: string; name: string; slug: string; _count: { posts: number } }[];
}

export function TimelineMap({ timelines }: TimelineMapProps) {
  const { navigateWithTransition } = useTimeTravel();

  // Place nodes in a branching tree layout
  const ORIGIN = { x: 120, y: 200 };
  const positions = [
    { x: 320, y: 80 },
    { x: 320, y: 160 },
    { x: 320, y: 240 },
    { x: 320, y: 320 },
    { x: 480, y: 110 },
    { x: 480, y: 210 },
    { x: 480, y: 310 },
    { x: 640, y: 150 },
    { x: 640, y: 270 },
  ];

  const nodes: TimelineNode[] = timelines.map((t, i) => ({
    id: t.id,
    label: t.name,
    slug: t.slug,
    count: t._count.posts,
    x: positions[i % positions.length].x,
    y: positions[i % positions.length].y,
  }));

  // SVG viewport
  const WIDTH = 760;
  const HEIGHT = 420;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full min-w-[500px]"
        style={{ height: "auto", minHeight: "280px", maxHeight: "460px" }}
      >
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3BE58B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3BE58B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="origin-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3BE58B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3BE58B" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background subtle grid lines */}
        {[...Array(8)].map((_, i) => (
          <line
            key={`h${i}`}
            x1={0} y1={i * (HEIGHT / 8)}
            x2={WIDTH} y2={i * (HEIGHT / 8)}
            stroke="#263F30" strokeWidth="0.5" strokeOpacity="0.4"
          />
        ))}

        {/* Timeline branches (lines from origin to nodes) */}
        {nodes.map((node, i) => (
          <motion.line
            key={`line-${node.id}`}
            x1={ORIGIN.x} y1={ORIGIN.y}
            x2={node.x} y2={node.y}
            stroke="#1D6B45"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
          />
        ))}

        {/* Sub-branch connections between adjacent nodes */}
        {nodes.slice(0, 3).map((node, i) =>
          nodes[i + 1] ? (
            <motion.line
              key={`sub-${i}`}
              x1={node.x} y1={node.y}
              x2={nodes[i + 1].x} y2={nodes[i + 1].y}
              stroke="#263F30"
              strokeWidth="0.8"
              strokeDasharray="4,4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
            />
          ) : null
        )}

        {/* Origin / ROOT node */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={30} fill="url(#origin-glow)" />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={10} fill="#050A07" stroke="#3BE58B" strokeWidth="2" filter="url(#glow)" />
          <circle cx={ORIGIN.x} cy={ORIGIN.y} r={18} fill="none" stroke="#3BE58B" strokeWidth="0.8" strokeDasharray="3,3" />
          <text x={ORIGIN.x} y={ORIGIN.y - 22} textAnchor="middle" fill="#91A096" fontSize="9" fontFamily="monospace" letterSpacing="2">
            ROOT
          </text>
        </motion.g>

        {/* Timeline nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
            className="cursor-pointer group"
            onClick={() => navigateWithTransition(`/topics/${node.slug}`)}
          >
            {/* Glow halo */}
            <circle cx={node.x} cy={node.y} r={22} fill="url(#node-glow)" opacity={0} className="group-hover:opacity-100 transition-opacity" />

            {/* Node circle */}
            <circle
              cx={node.x} cy={node.y} r={7}
              fill="#050A07"
              stroke="#1D6B45"
              strokeWidth="1.5"
              className="group-hover:stroke-[#3BE58B] transition-all"
              filter="url(#glow)"
            />

            {/* Timeline ID badge */}
            <text
              x={node.x + 14} y={node.y - 6}
              fill="#C49A45"
              fontSize="8"
              fontFamily="monospace"
              letterSpacing="1.5"
              className="group-hover:fill-[#E0BD65] transition-colors"
            >
              T-{String(i + 1).padStart(2, "0")}
            </text>

            {/* Label */}
            <text
              x={node.x + 14} y={node.y + 7}
              fill="#E9EFE9"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="1"
              className="group-hover:fill-[#3BE58B] transition-colors"
            >
              {node.label.toUpperCase().slice(0, 14)}
            </text>

            {/* Event count */}
            <text
              x={node.x + 14} y={node.y + 20}
              fill="#91A096"
              fontSize="8"
              fontFamily="monospace"
              letterSpacing="1"
            >
              {node.count} EVENTS
            </text>

            {/* Pulsing ring on hover */}
            <motion.circle
              cx={node.x} cy={node.y} r={12}
              fill="none"
              stroke="#3BE58B"
              strokeWidth="0.8"
              opacity={0}
              animate={{ r: [7, 16, 7], opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          </motion.g>
        ))}

        {/* Floating particles along branch lines */}
        {nodes.slice(0, 4).map((node, i) => (
          <motion.circle
            key={`particle-${i}`}
            r={1.5}
            fill="#3BE58B"
            filter="url(#glow)"
            animate={{
              cx: [ORIGIN.x, node.x, ORIGIN.x],
              cy: [ORIGIN.y, node.y, ORIGIN.y],
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 4, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
