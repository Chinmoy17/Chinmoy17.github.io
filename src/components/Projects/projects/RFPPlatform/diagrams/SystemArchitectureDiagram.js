import React from "react";

/**
 * SystemArchitectureDiagram
 * Research-paper-style architecture diagram with individual component boxes,
 * labeled connections, and clear layer separation.
 */
function SystemArchitectureDiagram() {
  // Layout constants
  const W = 820;
  const H = 620;

  // Colors - muted, academic style
  const C = {
    frontend: { fill: "#EFF6FF", stroke: "#93C5FD", text: "#1E40AF", label: "#3B82F6" },
    api: { fill: "#ECFDF5", stroke: "#86EFAC", text: "#166534", label: "#10B981" },
    ai: { fill: "#F5F3FF", stroke: "#C4B5FD", text: "#5B21B6", label: "#8B5CF6" },
    data: { fill: "#FFFBEB", stroke: "#FCD34D", text: "#92400E", label: "#F59E0B" },
    external: { fill: "#FFF1F2", stroke: "#FDA4AF", text: "#9F1239", label: "#F43F5E" },
    line: "#94A3B8",
    lineDash: "#CBD5E1",
    bg: "#FAFAFA",
    layerBg: "rgba(0,0,0,0.02)",
    layerBorder: "#E2E8F0",
    labelBg: "white",
  };

  const font = "system-ui, -apple-system, 'Segoe UI', sans-serif";
  const mono = "'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace";

  // Component box helper
  const Box = ({ x, y, w, h, label, sub, colors, rx = 4 }) => (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={rx}
        fill={colors.fill} stroke={colors.stroke} strokeWidth={1.2}
      />
      <text
        x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 4)}
        textAnchor="middle" fontSize={10} fontWeight="600"
        fill={colors.text} fontFamily={font}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2} y={y + h / 2 + 10}
          textAnchor="middle" fontSize={8} fill={colors.text}
          fontFamily={mono} opacity={0.7}
        >
          {sub}
        </text>
      )}
    </g>
  );

  // Arrow with label
  const Arrow = ({ x1, y1, x2, y2, label, dashed }) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    return (
      <g>
        <line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={C.line} strokeWidth={1}
          strokeDasharray={dashed ? "4,3" : "none"}
          markerEnd="url(#arrowHead)"
        />
        {label && (
          <>
            <rect
              x={midX - label.length * 3 - 4} y={midY - 7}
              width={label.length * 6 + 8} height={14}
              rx={3} fill={C.labelBg} stroke={C.layerBorder} strokeWidth={0.5}
            />
            <text
              x={midX} y={midY + 3}
              textAnchor="middle" fontSize={7.5} fill={C.line}
              fontFamily={mono}
            >
              {label}
            </text>
          </>
        )}
      </g>
    );
  };

  // Bidirectional arrow
  const BiArrow = ({ x1, y1, x2, y2, label }) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    return (
      <g>
        <line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={C.line} strokeWidth={1}
          markerEnd="url(#arrowHead)" markerStart="url(#arrowTail)"
        />
        {label && (
          <>
            <rect
              x={midX - label.length * 3 - 4} y={midY - 7}
              width={label.length * 6 + 8} height={14}
              rx={3} fill={C.labelBg} stroke={C.layerBorder} strokeWidth={0.5}
            />
            <text
              x={midX} y={midY + 3}
              textAnchor="middle" fontSize={7.5} fill={C.line}
              fontFamily={mono}
            >
              {label}
            </text>
          </>
        )}
      </g>
    );
  };

  // Layer label (rotated, left side)
  const LayerLabel = ({ y, h, label, color }) => (
    <g>
      <text
        x={14} y={y + h / 2}
        textAnchor="middle" fontSize={9} fontWeight="700"
        fill={color} fontFamily={font}
        transform={`rotate(-90, 14, ${y + h / 2})`}
        letterSpacing="0.08em"
      >
        {label}
      </text>
    </g>
  );

  // Layout: 4 horizontal layers
  const layerX = 32;
  const layerW = W - 52;
  const layers = [
    { y: 16, h: 100 },   // Frontend
    { y: 140, h: 115 },  // API
    { y: 280, h: 115 },  // AI Services
    { y: 420, h: 115 },  // Data & Infrastructure
  ];

  // External services (right side)
  const extX = 680;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: W, display: "block", margin: "0 auto" }}
      role="img"
      aria-label="System architecture diagram"
    >
      <defs>
        <marker id="arrowHead" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="none" stroke={C.line} strokeWidth="1" />
        </marker>
        <marker id="arrowTail" markerWidth="7" markerHeight="5" refX="0" refY="2.5" orient="auto">
          <path d="M7,0 L0,2.5 L7,5" fill="none" stroke={C.line} strokeWidth="1" />
        </marker>
      </defs>

      {/* Background */}
      <rect width={W} height={H} fill="none" />

      {/* ========== LAYER 1: FRONTEND ========== */}
      <rect
        x={layerX} y={layers[0].y} width={layerW} height={layers[0].h}
        rx={6} fill={C.layerBg} stroke={C.layerBorder} strokeWidth={0.8}
        strokeDasharray="6,3"
      />
      <LayerLabel y={layers[0].y} h={layers[0].h} label="PRESENTATION" color={C.frontend.label} />

      <Box x={60} y={32} w={110} h={68} label="React 18 SPA" sub="TypeScript + Vite" colors={C.frontend} />
      <Box x={186} y={32} w={100} h={68} label="Monaco Editor" sub="Code editing" colors={C.frontend} />
      <Box x={302} y={32} w={100} h={68} label="Recharts" sub="Cost analytics" colors={C.frontend} />
      <Box x={418} y={32} w={120} h={68} label="Rich Block UI" sub="10 block types" colors={C.frontend} />
      <Box x={554} y={32} w={100} h={68} label="Tailwind CSS" sub="Responsive" colors={C.frontend} />

      {/* ========== LAYER 2: API ========== */}
      <rect
        x={layerX} y={layers[1].y} width={layerW} height={layers[1].h}
        rx={6} fill={C.layerBg} stroke={C.layerBorder} strokeWidth={0.8}
        strokeDasharray="6,3"
      />
      <LayerLabel y={layers[1].y} h={layers[1].h} label="API LAYER" color={C.api.label} />

      <Box x={60} y={155} w={130} h={42} label="FastAPI + Uvicorn" sub="async REST server" colors={C.api} />
      <Box x={204} y={155} w={105} h={42} label="SSE Event Bus" sub="real-time stream" colors={C.api} />
      <Box x={323} y={155} w={105} h={42} label="Session Auth" sub="cookie + SSO" colors={C.api} />
      <Box x={442} y={155} w={105} h={42} label="Sanitization" sub="18 regex patterns" colors={C.api} />

      {/* Router labels below */}
      <text x={60} y={218} fontSize={8} fill={C.api.text} fontFamily={mono} opacity={0.6}>
        /api/proposals
      </text>
      <text x={175} y={218} fontSize={8} fill={C.api.text} fontFamily={mono} opacity={0.6}>
        /api/profiling
      </text>
      <text x={285} y={218} fontSize={8} fill={C.api.text} fontFamily={mono} opacity={0.6}>
        /api/conversation
      </text>
      <text x={410} y={218} fontSize={8} fill={C.api.text} fontFamily={mono} opacity={0.6}>
        /api/costs
      </text>
      <text x={510} y={218} fontSize={8} fill={C.api.text} fontFamily={mono} opacity={0.6}>
        /api/sharepoint
      </text>
      {/* Endpoint count */}
      <rect x={560} y={157} width={86} height={38} rx={4} fill="none" stroke={C.api.stroke} strokeWidth={1} strokeDasharray="3,2" />
      <text x={603} y={174} textAnchor="middle" fontSize={9} fontWeight="600" fill={C.api.text} fontFamily={font}>
        30+ Endpoints
      </text>
      <text x={603} y={186} textAnchor="middle" fontSize={7.5} fill={C.api.text} fontFamily={mono} opacity={0.6}>
        7 router modules
      </text>

      {/* ========== LAYER 3: AI SERVICES ========== */}
      <rect
        x={layerX} y={layers[2].y} width={layerW} height={layers[2].h}
        rx={6} fill={C.layerBg} stroke={C.layerBorder} strokeWidth={0.8}
        strokeDasharray="6,3"
      />
      <LayerLabel y={layers[2].y} h={layers[2].h} label="AI SERVICES" color={C.ai.label} />

      <Box x={60} y={298} w={130} h={42} label="Claude Opus 4.6" sub="Agent SDK · proposals" colors={C.ai} />
      <Box x={204} y={298} w={130} h={42} label="Claude Sonnet 4.6" sub="conversation · annotation" colors={C.ai} />
      <Box x={348} y={298} w={110} h={42} label="GPT-4.1" sub="analysis · JSON output" colors={C.ai} />
      <Box x={472} y={298} w={130} h={42} label="Azure Doc Intel" sub="OCR · layout extraction" colors={C.ai} />

      {/* Agent tools label */}
      <rect x={60} y={352} width={130} height={28} rx={4} fill="none" stroke={C.ai.stroke} strokeWidth={0.8} strokeDasharray="3,2" />
      <text x={125} y={370} textAnchor="middle" fontSize={7.5} fill={C.ai.text} fontFamily={mono} opacity={0.7}>
        Read / Write / Bash tools
      </text>

      {/* LangChain label */}
      <rect x={204} y={352} width={130} height={28} rx={4} fill="none" stroke={C.ai.stroke} strokeWidth={0.8} strokeDasharray="3,2" />
      <text x={269} y={370} textAnchor="middle" fontSize={7.5} fill={C.ai.text} fontFamily={mono} opacity={0.7}>
        LangChain + LangGraph
      </text>

      {/* PageIndex QA */}
      <rect x={348} y={352} width={110} height={28} rx={4} fill="none" stroke={C.ai.stroke} strokeWidth={0.8} strokeDasharray="3,2" />
      <text x={403} y={370} textAnchor="middle" fontSize={7.5} fill={C.ai.text} fontFamily={mono} opacity={0.7}>
        PageIndex QA
      </text>

      {/* ========== LAYER 4: DATA & INFRA ========== */}
      <rect
        x={layerX} y={layers[3].y} width={layerW} height={layers[3].h}
        rx={6} fill={C.layerBg} stroke={C.layerBorder} strokeWidth={0.8}
        strokeDasharray="6,3"
      />
      <LayerLabel y={layers[3].y} h={layers[3].h} label="DATA & INFRA" color={C.data.label} />

      <Box x={60} y={438} w={130} h={42} label="Azure SQL" sub="15+ tables · pyodbc" colors={C.data} />
      <Box x={204} y={438} w={130} h={42} label="Azure Blob Storage" sub="docs · proposals · PPTs" colors={C.data} />
      <Box x={348} y={438} w={130} h={42} label="Azure App Service" sub="Docker container (B1)" colors={C.data} />
      <Box x={492} y={438} w={110} h={42} label="GitLab CI/CD" sub="ACR → auto deploy" colors={C.data} />

      {/* Table groups under SQL */}
      <text x={60} y={498} fontSize={7} fill={C.data.text} fontFamily={mono} opacity={0.55}>
        opportunities · proposals · profiles · cost_events · conversations · jobs
      </text>

      {/* Docker detail */}
      <rect x={348} y={492} width={254} height={28} rx={4} fill="none" stroke={C.data.stroke} strokeWidth={0.7} strokeDasharray="3,2" />
      <text x={475} y={510} textAnchor="middle" fontSize={7.5} fill={C.data.text} fontFamily={mono} opacity={0.6}>
        Multi-stage: node:20-alpine → python:3.12-slim + Chromium
      </text>

      {/* ========== EXTERNAL SERVICES (right side) ========== */}
      <Box x={extX} y={155} w={100} h={42} label="SAM.gov" sub="federal RFPs" colors={C.external} />
      <Box x={extX} y={210} w={100} h={42} label="SharePoint" sub="Graph API" colors={C.external} />
      <Box x={extX} y={298} w={100} h={42} label="Firecrawl" sub="web scraping" colors={C.external} />
      <Box x={extX} y={352} w={100} h={42} label="Apify" sub="portal agents" colors={C.external} />

      {/* External label */}
      <text x={extX + 50} y={148} textAnchor="middle" fontSize={8} fontWeight="600" fill={C.external.label} fontFamily={font} letterSpacing="0.06em">
        EXTERNAL
      </text>

      {/* ========== CONNECTION ARROWS ========== */}

      {/* Frontend → API (REST + SSE) */}
      <Arrow x1={170} y1={100} x2={170} y2={155} label="REST" />
      <Arrow x1={256} y1={100} x2={256} y2={155} label="SSE" />

      {/* API → AI Services */}
      <Arrow x1={125} y1={197} x2={125} y2={298} label="Agent SDK" />
      <Arrow x1={269} y1={197} x2={269} y2={298} label="API calls" />
      <Arrow x1={403} y1={197} x2={403} y2={298} label="Azure SDK" />
      <Arrow x1={537} y1={197} x2={537} y2={298} label="REST" />

      {/* AI → Data */}
      <Arrow x1={125} y1={380} x2={125} y2={438} label="read/write" dashed />
      <Arrow x1={269} y1={340} x2={269} y2={438} label="store" dashed />

      {/* API → Data */}
      <Arrow x1={403} y1={228} x2={403} y2={438} label="pyodbc" dashed />
      <BiArrow x1={498} y1={228} x2={498} y2={438} label="blob SDK" />

      {/* API → External */}
      <Arrow x1={646} y1={176} x2={680} y2={176} label="" />
      <Arrow x1={646} y1={231} x2={680} y2={231} label="" />

      {/* AI → External */}
      <Arrow x1={602} y1={319} x2={680} y2={319} label="" />
      <Arrow x1={602} y1={373} x2={680} y2={373} label="" />

      {/* ========== FIGURE LABEL ========== */}
      <text
        x={W / 2} y={H - 8}
        textAnchor="middle" fontSize={9} fill="#94A3B8"
        fontFamily={font} fontStyle="italic"
      >
        Fig. 1 — System architecture overview. Dashed boundaries denote logical layers.
      </text>
    </svg>
  );
}

export default SystemArchitectureDiagram;
