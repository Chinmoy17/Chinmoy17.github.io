import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useScrollProgress, useMediaQuery, detectWebGL } from "./useScrollProgress";

const SystemCube = lazy(() => import("./SystemCube"));

const ACCENT = "#5b5fc7";

function TechChips({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="font-inter text-[0.68rem] text-on-surface-variant/80 border border-surface-variant px-2.5 py-1 uppercase tracking-wider">
          {t}
        </span>
      ))}
    </div>
  );
}

const NODE_W = 104;
const NODE_H = 42;
const PAPER = "#f8f4ec";
const PAGE = "#fcf9f4";

// Point on the border of node `from` in the direction of node `to`.
function nodeEdgePoint(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dx === 0 && dy === 0) return { x: from.x, y: from.y };
  const sx = dx !== 0 ? NODE_W / 2 / Math.abs(dx) : Infinity;
  const sy = dy !== 0 ? NODE_H / 2 / Math.abs(dy) : Infinity;
  const s = Math.min(sx, sy);
  return { x: from.x + dx * s, y: from.y + dy * s };
}

function DiagramNode({ n, i }) {
  const accent = n.type === "accent";
  const external = n.type === "external";
  const store = n.type === "store";
  const stroke = accent ? ACCENT : "#1a1a1a";
  const strokeOpacity = accent ? 1 : external ? 0.4 : 0.45;
  const strokeWidth = accent ? 1.5 : 1;
  const fill = accent ? "#f4f2fb" : PAPER;
  const left = n.x - NODE_W / 2;
  const top = n.y - NODE_H / 2;
  const ry = 6;
  return (
    <g className="motion-safe:animate-pop-in"
      style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${0.06 + i * 0.08}s` }}>
      {store ? (
        <g>
          <path
            d={`M ${left} ${top + ry} L ${left} ${top + NODE_H - ry} A ${NODE_W / 2} ${ry} 0 0 0 ${n.x + NODE_W / 2} ${top + NODE_H - ry} L ${n.x + NODE_W / 2} ${top + ry}`}
            fill={fill} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth={strokeWidth} />
          <ellipse cx={n.x} cy={top + ry} rx={NODE_W / 2} ry={ry} fill={fill} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth={strokeWidth} />
        </g>
      ) : (
        <rect x={left} y={top} width={NODE_W} height={NODE_H} rx="5"
          fill={fill} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth={strokeWidth}
          strokeDasharray={external ? "3 3" : undefined} />
      )}
      <text x={n.x} y={store ? n.y : n.y - 4} textAnchor="middle" dominantBaseline="central"
        fontFamily="Inter, sans-serif" fontSize="11" fill="#1a1a1a"
        style={{ fontWeight: accent ? 600 : 500 }}>
        {n.label}
      </text>
      {n.sub && (
        <text x={n.x} y={store ? n.y + 12 : n.y + 9} textAnchor="middle" dominantBaseline="central"
          fontFamily="Inter, sans-serif" fontSize="8.5" fill="#1a1a1a" fillOpacity="0.5">
          {n.sub}
        </text>
      )}
    </g>
  );
}

function DiagramEdge({ a, b, edge, i }) {
  const p1 = nodeEdgePoint(a, b);
  const p2 = nodeEdgePoint(b, a);
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  const dashed = edge.dashed;
  const lw = edge.label ? edge.label.length * 4.5 + 10 : 0;
  return (
    <g>
      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
        stroke="#1a1a1a" strokeOpacity={dashed ? 0.36 : 0.5} strokeWidth={dashed ? 1.2 : 1.4}
        markerEnd="url(#n2a-arrow)"
        pathLength={dashed ? undefined : 1}
        strokeDasharray={dashed ? "4 4" : 1}
        className={dashed ? undefined : "motion-safe:animate-draw-line"}
        style={dashed ? undefined : { strokeDashoffset: 1, animationDelay: `${0.2 + i * 0.1}s` }} />
      {edge.label && (
        <g className="motion-safe:animate-pop-in"
          style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${0.45 + i * 0.1}s` }}>
          <rect x={mx - lw / 2} y={my - 16} width={lw} height="13" rx="2" fill={PAGE} />
          <text x={mx} y={my - 9} textAnchor="middle" dominantBaseline="central"
            fontFamily="Inter, sans-serif" fontSize="8" fill="#1a1a1a" fillOpacity="0.55"
            style={{ letterSpacing: "0.02em" }}>
            {edge.label}
          </text>
        </g>
      )}
    </g>
  );
}

// Animated architecture diagram — draws itself in on each face change.
function DomainDiagram({ diagram }) {
  if (!diagram) return null;
  const byId = {};
  diagram.nodes.forEach((n) => {
    byId[n.id] = n;
  });
  return (
    <svg viewBox="0 0 360 210" className="w-full h-auto" role="img" aria-hidden="true">
      <defs>
        <marker id="n2a-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a" fillOpacity="0.5" />
        </marker>
      </defs>
      {diagram.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        return <DiagramEdge key={i} a={a} b={b} edge={e} i={i} />;
      })}
      {diagram.nodes.map((n, i) => (
        <DiagramNode key={n.id} n={n} i={i} />
      ))}
    </svg>
  );
}

function DetailPanel({ face, index, total }) {
  return (
    <div key={index} className="motion-safe:animate-fade-in" role="tabpanel" aria-live="polite">
      <p className="font-inter text-label-caps text-on-surface-variant/60 uppercase tracking-[0.1em] mb-3">
        {face.tag} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h3 className="font-newsreader text-[1.9rem] text-ink mb-4 leading-tight">{face.label}</h3>
      <div className="mb-5 max-w-[380px]">
        <DomainDiagram key={index} diagram={face.diagram} />
      </div>
      <div className="mb-4">
        <TechChips items={face.tech} />
      </div>
      <p className="font-inter text-[0.9rem] text-on-surface-variant/80 leading-relaxed max-w-md">{face.responsibility}</p>
    </div>
  );
}

function ControlStrip({ faces, active, onSelect }) {
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onSelect(Math.min(faces.length - 1, active + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onSelect(Math.max(0, active - 1));
    }
  };
  return (
    <div role="tablist" aria-label="System domains" onKeyDown={onKeyDown}
      className="flex flex-wrap gap-x-6 gap-y-3 border-t border-surface-variant pt-4">
      {faces.map((f, i) => {
        const on = i === active;
        return (
          <button key={f.id} type="button" role="tab" aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(i)}
            className="group flex items-baseline gap-2 no-underline">
            <span className="font-newsreader text-[0.8rem] text-on-surface-variant/30 select-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-inter text-[0.85rem] transition-colors pb-px ${
                on ? "text-ink border-b-2" : "text-on-surface-variant border-b-2 border-transparent group-hover:text-ink"
              }`}
              style={on ? { borderColor: ACCENT } : undefined}
            >
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CubeSkeleton({ face }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-40 h-40 border border-surface-variant rotate-[8deg] bg-surface-container-lowest flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <span className="font-newsreader text-[1.4rem] text-ink/70 -rotate-[8deg]">{face ? face.label : ""}</span>
      </div>
    </div>
  );
}

// Static "unfolded net" — the accessible + reduced-motion + no-WebGL fallback.
function NetGrid({ faces }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {faces.map((f, i) => (
        <div key={f.id} className="border-t-2 border-ink pt-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-newsreader text-[1.3rem] text-ink leading-none">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-newsreader text-[1.15rem] text-ink">{f.label}</h3>
            <span className="ml-auto font-inter text-[0.62rem] text-on-surface-variant/50 uppercase tracking-widest">{f.tag}</span>
          </div>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-3">{f.responsibility}</p>
          <TechChips items={f.tech} />
        </div>
      ))}
    </div>
  );
}

function SystemStage({ faces }) {
  const total = faces.length;
  const [webgl] = useState(detectWebGL);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const useCube = webgl && !reduced;

  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [inView, setInView] = useState(false);

  const scrollScrub = useCube && isDesktop;
  const onScrollProgress = useCallback(
    (p) => {
      const idx = Math.min(total - 1, Math.max(0, Math.round(p * (total - 1))));
      setActive((prev) => (prev === idx ? prev : idx));
    },
    [total]
  );
  useScrollProgress(trackRef, onScrollProgress, scrollScrub);

  // Load the 3D chunk only once the stage nears the viewport.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || inView) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  const scrollToFace = useCallback(
    (seq) => {
      const track = trackRef.current;
      if (!track || !scrollScrub) return;
      const top = track.getBoundingClientRect().top + window.scrollY;
      const totalScroll = track.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + (seq / (total - 1)) * totalScroll,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [scrollScrub, total, reduced]
  );

  const select = useCallback(
    (seq) => {
      setActive(seq);
      scrollToFace(seq);
    },
    [scrollToFace]
  );

  const srList = (
    <ul className="sr-only">
      {faces.map((f) => (
        <li key={f.id}>
          {f.label} ({f.tag}): {f.responsibility} Built with {f.tech.join(", ")}.
        </li>
      ))}
    </ul>
  );

  // --- Fallback: reduced-motion or no WebGL -> static net ---
  if (!useCube) {
    return (
      <div>
        <NetGrid faces={faces} />
      </div>
    );
  }

  const cube = (
    <Suspense fallback={<CubeSkeleton face={faces[active]} />}>
      {inView ? (
        <SystemCube faces={faces} activeIndex={active} onFaceClick={setActive} onActiveChange={setActive} reducedMotion={reduced} />
      ) : (
        <CubeSkeleton face={faces[active]} />
      )}
    </Suspense>
  );

  // --- Mobile: normal flow, no scroll hijack ---
  if (!isDesktop) {
    return (
      <div ref={stageRef}>
        {srList}
        <div className="h-[380px] w-full mb-3">{cube}</div>
        <p className="font-inter text-[0.72rem] text-on-surface-variant/50 mb-6 text-center">
          Drag to rotate · tap a face to open it
        </p>
        <div className="mb-8">
          <DetailPanel face={faces[active]} index={active} total={total} />
        </div>
        <ControlStrip faces={faces} active={active} onSelect={select} />
      </div>
    );
  }

  // --- Desktop: sticky canvas scrollytelling ---
  return (
    <div ref={stageRef}>
      {srList}
      <div ref={trackRef} className="relative" style={{ height: `${100 + total * 26}vh` }}>
        <div className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] flex flex-col justify-center gap-6 pb-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="h-[58vh] min-h-[400px] w-full">{cube}</div>
            <div className="min-h-[240px] flex items-center">
              <DetailPanel face={faces[active]} index={active} total={total} />
            </div>
          </div>
          <ControlStrip faces={faces} active={active} onSelect={select} />
        </div>
      </div>
      <p className="font-inter text-[0.72rem] text-on-surface-variant/50 mt-2">
        Scroll to turn the cube · drag to rotate freely · click a face to open it
      </p>
    </div>
  );
}

export default SystemStage;
