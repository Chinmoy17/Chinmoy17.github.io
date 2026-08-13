import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useScrollProgress, useMediaQuery, detectWebGL } from "./useScrollProgress";
import styles from "./SystemStage.module.css";

const SystemCube = lazy(() => import("./SystemCube"));

const DOMAIN_DETAILS = {
  frontend: {
    focus: "Turns shared API responses into reviewable notes, actions and insights.",
    contracts: ["SSO session", "GET /api/notes", "POST /api/extract_actions"],
  },
  backend: {
    focus: "Owns retrieval, prompt orchestration and the contract shared by both clients.",
    contracts: ["GET /api/notes", "POST /api/extract_actions", "GET /api/am_stats"],
  },
  ai: {
    focus: "Receives cleaned note context and returns only a suggested action plus due date.",
    contracts: ["temperature 0.3", "max_tokens 500", "N/A when evidence is weak"],
  },
  data: {
    focus: "Filters recent CRM notes, cleans HTML and preserves read continuity with a CSV fallback.",
    contracts: ["CRM filtered view", "BeautifulSoup + pandas", "data_source response flag"],
  },
  bot: {
    focus: "Bridges authenticated Teams activities to the same API and renders Adaptive Cards.",
    contracts: ["Bot Framework activity", "Adaptive Card payload", "mailto handoff"],
  },
  deploy: {
    focus: "Packages the web UI with FastAPI while keeping the Teams bot independently deployable.",
    contracts: ["Next.js static export", "one web image + port", "separate bot service"],
  },
};

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

function SystemBackbone({ activeId }) {
  const active = (id) => activeId === id || (activeId === "deploy" && id === "runtime");
  return (
    <div className={styles.backboneWrap}>
      <p className="sr-only">
        Recent CRM notes and the CSV fallback feed the data service, which connects to the stateless FastAPI backend. The backend calls Azure OpenAI and returns actions to the Next.js web dashboard and Microsoft Teams bot.
      </p>
      <svg viewBox="0 0 620 250" className={styles.backbone} aria-hidden="true">
        <defs>
          <marker id="backbone-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
          </marker>
        </defs>

        <rect x="8" y="18" width="604" height="214" rx="8" className={`${styles.runtimeBoundary} ${active("runtime") ? styles.activeBoundary : ""}`} />
        <text x="24" y="40" className={styles.boundaryLabel}>DEPLOYMENT BOUNDARY · WEB IMAGE + SEPARATE BOT</text>

        <path d="M94 86 H145" className={styles.flowLine} markerEnd="url(#backbone-arrow)" />
        <path d="M94 166 H145" className={`${styles.flowLine} ${styles.fallbackLine}`} markerEnd="url(#backbone-arrow)" />
        <path d="M246 126 H298" className={styles.flowLine} markerEnd="url(#backbone-arrow)" />
        <path d="M398 119 C430 94 444 88 472 88" className={styles.flowLine} markerEnd="url(#backbone-arrow)" />
        <path d="M398 145 C430 172 447 178 472 178" className={styles.flowLine} markerEnd="url(#backbone-arrow)" />
        <path d="M348 92 V62 H392" className={styles.aiLine} markerEnd="url(#backbone-arrow)" />
        <path d="M468 62 H490 V112 H398" className={styles.returnLine} markerEnd="url(#backbone-arrow)" />

        <g className={`${styles.systemNode} ${active("data") ? styles.activeNode : ""}`}>
          <rect x="18" y="59" width="76" height="54" rx="5" />
          <text x="56" y="80">CRM</text>
          <text x="56" y="96" className={styles.nodeSub}>recent notes</text>
        </g>
        <g className={`${styles.systemNode} ${styles.secondaryNode} ${active("data") ? styles.activeNode : ""}`}>
          <rect x="18" y="139" width="76" height="54" rx="5" />
          <text x="56" y="160">CSV</text>
          <text x="56" y="176" className={styles.nodeSub}>fallback</text>
        </g>
        <g className={`${styles.systemNode} ${active("data") ? styles.activeNode : ""}`}>
          <rect x="145" y="94" width="101" height="64" rx="5" />
          <text x="195" y="118">Data service</text>
          <text x="195" y="136" className={styles.nodeSub}>clean · normalize</text>
        </g>
        <g className={`${styles.systemNode} ${active("backend") ? styles.activeNode : ""}`}>
          <rect x="298" y="92" width="100" height="68" rx="5" />
          <text x="348" y="117">FastAPI</text>
          <text x="348" y="136" className={styles.nodeSub}>stateless core</text>
        </g>
        <g className={`${styles.systemNode} ${styles.aiNode} ${active("ai") ? styles.activeNode : ""}`}>
          <rect x="392" y="42" width="76" height="40" rx="5" />
          <text x="430" y="59">Azure OpenAI</text>
          <text x="430" y="72" className={styles.nodeSub}>2-field output</text>
        </g>
        <g className={`${styles.systemNode} ${active("frontend") ? styles.activeNode : ""}`}>
          <rect x="500" y="76" width="102" height="49" rx="5" />
          <text x="551" y="95">Web dashboard</text>
          <text x="551" y="111" className={styles.nodeSub}>Next.js · SSO</text>
        </g>
        <g className={`${styles.systemNode} ${active("bot") ? styles.activeNode : ""}`}>
          <rect x="500" y="153" width="102" height="49" rx="5" />
          <text x="551" y="172">Teams bot</text>
          <text x="551" y="188" className={styles.nodeSub}>Adaptive Cards</text>
        </g>

        <text x="112" y="81" className={styles.edgeLabel}>primary</text>
        <text x="106" y="161" className={styles.edgeLabel}>fallback</text>
        <text x="260" y="116" className={styles.edgeLabel}>notes</text>
        <text x="431" y="102" className={styles.edgeLabel}>JSON</text>
        <text x="408" y="164" className={styles.edgeLabel}>JSON</text>
        <text x="356" y="54" className={styles.edgeLabel}>prompt</text>
      </svg>
    </div>
  );
}

function DetailPanel({ face, index, total }) {
  const detail = DOMAIN_DETAILS[face.id];
  return (
    <div className={styles.carpetPanel} role="tabpanel" aria-live="polite">
      <div className={styles.carpetHeader}>
        <div>
          <p className={styles.carpetKicker}>{face.tag} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
          <h3>{face.label}</h3>
        </div>
        <span className={styles.carpetRole}>Ownership view</span>
      </div>

      <SystemBackbone activeId={face.id} />

      <div className={styles.domainLedger}>
        <div>
          <span>Responsibility</span>
          <p>{detail.focus}</p>
        </div>
        <div>
          <span>Contracts &amp; guardrails</span>
          <ul>
            {detail.contracts.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
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
      className={styles.domainControls}>
      {faces.map((f, i) => {
        const on = i === active;
        return (
          <button key={f.id} type="button" role="tab" aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(i)}
            className={`${styles.domainButton} ${on ? styles.domainButtonActive : ""}`}>
            <span className={styles.domainNumber}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.domainLabel}>{f.label}</span>
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
      <div ref={trackRef} className="relative" style={{ height: `${100 + (total - 1) * 19}vh` }}>
        <div className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] flex flex-col justify-start gap-4 pt-3 pb-2">
          <div className="grid md:grid-cols-[0.92fr_1.08fr] gap-5 items-center">
            <div className="h-[60vh] min-h-[410px] w-full">{cube}</div>
            <div className="min-h-[350px] flex items-center">
              <DetailPanel face={faces[active]} index={active} total={total} />
            </div>
          </div>
          <ControlStrip faces={faces} active={active} onSelect={select} />
        </div>
      </div>
    </div>
  );
}

export default SystemStage;
