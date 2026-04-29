import React from "react";

/**
 * DataFlowDiagram
 * Horizontal pipeline: Discover → Ingest → Profile → Generate → Present
 * Becomes vertical on narrow screens via CSS (parent handles responsive).
 */
function DataFlowDiagram({ stages }) {
  const nodeWidth = 120;
  const nodeHeight = 80;
  const gap = 36;
  const padding = 16;
  const totalWidth =
    padding * 2 + stages.length * nodeWidth + (stages.length - 1) * gap;
  const totalHeight = padding * 2 + nodeHeight + 40; // extra for labels

  const colors = ["#3B82F6", "#8B5CF6", "#6366F1", "#10B981", "#F59E0B"];

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      width="100%"
      style={{ maxWidth: totalWidth, display: "block", margin: "0 auto" }}
      role="img"
      aria-label="Data flow pipeline from opportunity discovery to presentation generation"
    >
      <defs>
        <filter id="flow-shadow" x="-4%" y="-8%" width="108%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.06" />
        </filter>
        <marker
          id="flow-chevron"
          markerWidth="10"
          markerHeight="8"
          refX="10"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L10,4 L0,8" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
        </marker>
      </defs>

      {stages.map((stage, i) => {
        const x = padding + i * (nodeWidth + gap);
        const y = padding;
        const color = colors[i % colors.length];
        const cx = x + nodeWidth / 2;

        return (
          <g key={stage.stage}>
            {/* Node rectangle */}
            <rect
              x={x}
              y={y}
              width={nodeWidth}
              height={nodeHeight}
              rx={10}
              fill="white"
              stroke={color}
              strokeWidth={1.5}
              filter="url(#flow-shadow)"
            />
            {/* Top accent */}
            <rect
              x={x}
              y={y}
              width={nodeWidth}
              height={4}
              rx={2}
              fill={color}
            />

            {/* Stage label */}
            <text
              x={cx}
              y={y + 28}
              textAnchor="middle"
              fontSize={10}
              fontWeight="700"
              fill={color}
              fontFamily="system-ui, -apple-system, sans-serif"
              textTransform="uppercase"
              letterSpacing="0.05em"
            >
              {stage.stage}
            </text>

            {/* Stage name */}
            <text
              x={cx}
              y={y + 46}
              textAnchor="middle"
              fontSize={10.5}
              fontWeight="600"
              fill="#1E293B"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {stage.label}
            </text>

            {/* Detail text (wraps manually) */}
            <text
              x={cx}
              y={y + 62}
              textAnchor="middle"
              fontSize={8.5}
              fill="#64748B"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {stage.detail.length > 40
                ? stage.detail.substring(0, 38) + "..."
                : stage.detail}
            </text>

            {/* Arrow to next node */}
            {i < stages.length - 1 && (
              <line
                x1={x + nodeWidth + 4}
                y1={y + nodeHeight / 2}
                x2={x + nodeWidth + gap - 4}
                y2={y + nodeHeight / 2}
                stroke="#CBD5E1"
                strokeWidth={1.5}
                markerEnd="url(#flow-chevron)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default DataFlowDiagram;
