import React from "react";

/**
 * DatabaseSchema
 * Simplified ER-style diagram showing key tables and relationships.
 * Renders as SVG with table boxes and relationship lines.
 */
function DatabaseSchema({ schema }) {
  const tables = schema.tables;
  const relationships = schema.relationships;

  // Layout: 3 columns, 2 rows
  const colWidth = 210;
  const rowHeight = 110;
  const colGap = 50;
  const rowGap = 60;
  const padding = 24;
  const tableWidth = 200;
  const tableHeight = 90;

  // Position mapping for tables
  const positions = [
    { col: 0, row: 0 }, // sam_gov_opportunities
    { col: 1, row: 0 }, // rfp_document_index
    { col: 2, row: 0 }, // company_profiles
    { col: 0, row: 1 }, // proposals
    { col: 1, row: 1 }, // cost_events
    { col: 2, row: 1 }, // conversations
  ];

  const getPos = (idx) => ({
    x: padding + positions[idx].col * (colWidth + colGap),
    y: padding + positions[idx].row * (rowHeight + rowGap),
  });

  const totalWidth = padding * 2 + 3 * colWidth + 2 * colGap;
  const totalHeight = padding * 2 + 2 * rowHeight + rowGap;

  const tableIndex = {};
  tables.forEach((t, i) => {
    tableIndex[t.name] = i;
  });

  // Compute line endpoints for relationships
  const getConnectionPoints = (fromIdx, toIdx) => {
    const from = getPos(fromIdx);
    const to = getPos(toIdx);
    const fromCx = from.x + tableWidth / 2;
    const fromCy = from.y + tableHeight / 2;
    const toCx = to.x + tableWidth / 2;
    const toCy = to.y + tableHeight / 2;

    let x1, y1, x2, y2;

    // Determine connection direction
    if (Math.abs(fromCx - toCx) > Math.abs(fromCy - toCy)) {
      // Horizontal connection
      if (fromCx < toCx) {
        x1 = from.x + tableWidth;
        x2 = to.x;
      } else {
        x1 = from.x;
        x2 = to.x + tableWidth;
      }
      y1 = fromCy;
      y2 = toCy;
    } else {
      // Vertical connection
      x1 = fromCx;
      x2 = toCx;
      if (fromCy < toCy) {
        y1 = from.y + tableHeight;
        y2 = to.y;
      } else {
        y1 = from.y;
        y2 = to.y + tableHeight;
      }
    }

    return { x1, y1, x2, y2 };
  };

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      width="100%"
      style={{ maxWidth: totalWidth, display: "block", margin: "0 auto" }}
      role="img"
      aria-label="Database schema overview showing key tables and relationships"
    >
      <defs>
        <filter id="db-shadow" x="-4%" y="-8%" width="108%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.06" />
        </filter>
        <marker
          id="db-arrow"
          markerWidth="6"
          markerHeight="5"
          refX="6"
          refY="2.5"
          orient="auto"
        >
          <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="#94A3B8" strokeWidth="1" />
        </marker>
      </defs>

      {/* Relationship lines (render behind tables) */}
      {relationships.map((rel, i) => {
        const fromIdx = tableIndex[rel.from];
        const toIdx = tableIndex[rel.to];
        if (fromIdx === undefined || toIdx === undefined) return null;
        const pts = getConnectionPoints(fromIdx, toIdx);
        const midX = (pts.x1 + pts.x2) / 2;
        const midY = (pts.y1 + pts.y2) / 2;

        return (
          <g key={i}>
            <line
              x1={pts.x1}
              y1={pts.y1}
              x2={pts.x2}
              y2={pts.y2}
              stroke="#CBD5E1"
              strokeWidth={1.5}
              strokeDasharray="5,3"
              markerEnd="url(#db-arrow)"
            />
            <rect
              x={midX - 16}
              y={midY - 9}
              width={32}
              height={18}
              rx={4}
              fill="white"
              stroke="#E2E8F0"
              strokeWidth={0.5}
            />
            <text
              x={midX}
              y={midY + 4}
              textAnchor="middle"
              fontSize={8}
              fill="#94A3B8"
              fontFamily="'SF Mono', Consolas, monospace"
            >
              {rel.label}
            </text>
          </g>
        );
      })}

      {/* Table boxes */}
      {tables.map((table, i) => {
        const pos = getPos(i);
        if (!pos) return null;

        return (
          <g key={table.name}>
            <rect
              x={pos.x}
              y={pos.y}
              width={tableWidth}
              height={tableHeight}
              rx={8}
              fill="white"
              stroke={table.color}
              strokeWidth={1.5}
              filter="url(#db-shadow)"
            />
            {/* Header bar */}
            <rect
              x={pos.x}
              y={pos.y}
              width={tableWidth}
              height={28}
              rx={8}
              fill={table.color}
            />
            <rect
              x={pos.x}
              y={pos.y + 20}
              width={tableWidth}
              height={8}
              fill={table.color}
            />
            {/* Table name */}
            <text
              x={pos.x + 10}
              y={pos.y + 18}
              fontSize={10.5}
              fontWeight="700"
              fill="white"
              fontFamily="'SF Mono', Consolas, monospace"
            >
              {table.name}
            </text>
            {/* Fields */}
            <text
              x={pos.x + 10}
              y={pos.y + 48}
              fontSize={9}
              fill="#64748B"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {table.fields.length > 50
                ? table.fields.substring(0, 48) + "..."
                : table.fields}
            </text>
            {/* Domain badge */}
            <text
              x={pos.x + 10}
              y={pos.y + 72}
              fontSize={8.5}
              fontWeight="600"
              fill={table.color}
              fontFamily="system-ui, -apple-system, sans-serif"
              textTransform="uppercase"
              letterSpacing="0.05em"
            >
              {table.domain}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default DatabaseSchema;
