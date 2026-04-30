import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import data from "./data";

import SystemArchitectureDiagram from "./diagrams/SystemArchitectureDiagram";
import DataFlowDiagram from "./diagrams/DataFlowDiagram";
import DatabaseSchema from "./diagrams/DatabaseSchema";

const CATEGORY_COLOR = {
  ai:           "text-violet-700",
  architecture: "text-emerald-700",
  infra:        "text-sky-700",
  scraping:     "text-amber-700",
  security:     "text-rose-700",
};

const MODEL_ACCENT = {
  "Claude Opus 4.6":        "#D97706",
  "Claude Sonnet 4.6":      "#F59E0B",
  "GPT-4.1":                "#10B981",
  "Azure Doc Intelligence": "#3B82F6",
};

const toc = [
  { id: "overview",     label: "Overview" },
  { id: "problem",      label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "pipeline",     label: "Data Pipeline" },
  { id: "modules",      label: "Core Modules" },
  { id: "model-fleet",  label: "Model Fleet" },
  { id: "decisions",    label: "Decisions" },
  { id: "database",     label: "Database" },
  { id: "tech-stack",   label: "Tech Stack" },
  { id: "results",      label: "Results" },
  { id: "next",         label: "What's Next" },
];

function RFPPlatformProject() {
  const navigate = useNavigate();
  const [expandedModules,   setExpandedModules]   = useState({});
  const [expandedDecisions, setExpandedDecisions] = useState({});

  const toggleModule   = (id) => setExpandedModules((p) => ({ ...p, [id]: !p[id] }));
  const toggleDecision = (i)  => setExpandedDecisions((p) => ({ ...p, [i]: !p[i] }));

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-16">

      {/* ===== TOP NAV ===== */}
      <div className="flex items-center justify-between mb-16">
        <button type="button" onClick={() => navigate("/project")}
          className="flex items-center gap-2 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors uppercase tracking-[0.1em]">
          <FiArrowLeft className="text-base" />
          Back to Projects
        </button>
        <Link to="/project"
          className="font-inter text-[0.8rem] text-on-surface-variant border-b border-surface-variant pb-px hover:text-ink hover:border-ink transition-colors no-underline uppercase tracking-[0.1em]">
          All Projects
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section className="mb-xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {["Private / Enterprise", "Government RFP", "Full-Stack AI Platform", "Sole Developer"].map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && <span className="text-on-surface-variant/40 text-xs">·</span>}
                <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">{tag}</span>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-newsreader text-h1 text-ink mb-4">RFP Platform</h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ink mb-6"></div>
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 max-w-2xl leading-relaxed">
            {data.tagline}
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-6 mt-10 pt-8 border-t border-surface-variant">
            {data.stats.map((s) => (
              <div key={s.label}>
                <p className="font-newsreader text-[2.25rem] text-ink leading-none mb-1">{s.value}</p>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Stack line */}
        <Reveal delay={350}>
          <p className="font-inter text-[0.78rem] text-on-surface-variant/60 mt-6 mb-10">
            {(data.stack || []).join(" · ")}
          </p>
        </Reveal>

        {/* Inline TOC index */}
        <Reveal delay={400}>
          <div className="border-t border-b border-surface-variant py-5">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {toc.map((item, i) => (
                <a key={item.id} href={`#${item.id}`}
                  className="flex items-baseline gap-2 no-underline group">
                  <span className="font-newsreader text-[0.8rem] text-on-surface-variant/30 group-hover:text-on-surface-variant/60 transition-colors select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-inter text-[0.8rem] text-on-surface-variant group-hover:text-ink transition-colors">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== OVERVIEW ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Overview</span>
      </div>
      <section id="overview" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Project Scope</h2>
        </Reveal>
        <div className="space-y-4">
          {data.tldr.map((item, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="font-inter text-body-md text-on-surface-variant leading-relaxed pl-5 border-l border-surface-variant">{item}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">The Problem</span>
      </div>
      <section id="problem" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">The Scenario</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">{data.problem.scenario}</p>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="font-newsreader text-[1.1rem] text-ink mb-4">Pain Points</h3>
          <div className="space-y-3 mb-8">
            {data.problem.painPoints.map((p, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">—</span>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-newsreader text-[1.3rem] italic text-ink/70 leading-relaxed">
            "This process takes <strong className="not-italic text-ink font-medium">2–4 weeks per RFP</strong> with specialized proposal writers. We reduced it to <strong className="not-italic text-ink font-medium">hours</strong>."
          </p>
        </Reveal>
      </section>

      {/* ===== SYSTEM ARCHITECTURE ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">System Architecture</span>
      </div>
      <section id="architecture" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Four-Layer Architecture</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-6">
            React SPA communicates with FastAPI over REST + SSE. The API layer orchestrates AI services and persists to Azure SQL and Blob Storage.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="border border-surface-variant p-4">
            <SystemArchitectureDiagram />
          </div>
          <p className="font-inter text-[0.75rem] text-on-surface-variant/60 mt-2 italic">
            Fig. 1 — Layered architecture with clear separation of concerns
          </p>
        </Reveal>
      </section>

      {/* ===== DATA PIPELINE ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Data Pipeline</span>
      </div>
      <section id="pipeline" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Five-Stage Pipeline</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-6">
            End-to-end flow from opportunity discovery to executive presentations. Each stage uses a purpose-selected model.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="border border-surface-variant p-4">
            <DataFlowDiagram stages={data.dataFlow} />
          </div>
          <p className="font-inter text-[0.75rem] text-on-surface-variant/60 mt-2 italic">
            Discover → Ingest → Profile → Generate → Present
          </p>
        </Reveal>
      </section>

      {/* ===== CORE MODULES ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Core Modules</span>
      </div>
      <section id="modules" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">7 Composable Modules</h2>
        </Reveal>
        <div>
          {data.modules.map((mod, i) => {
            const isOpen = expandedModules[mod.id];
            return (
              <Reveal key={mod.id} delay={i * 50}>
                <div className="border-b border-surface-variant">
                  <button type="button" aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                    onClick={() => toggleModule(mod.id)}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-newsreader text-[1.75rem] text-on-surface-variant/25 leading-none select-none shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-newsreader text-[1.15rem] text-ink group-hover:opacity-80 transition-opacity leading-snug mb-1">
                          {mod.name}
                        </p>
                        <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{mod.description}</p>
                      </div>
                    </div>
                    <FiChevronDown size={16} className={`shrink-0 mt-1.5 text-on-surface-variant/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="pb-5 pl-[3.25rem]">
                      <p className="font-inter text-[0.82rem] text-on-surface-variant leading-relaxed border-l border-surface-variant pl-4">
                        {mod.techDetail}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== AI MODEL FLEET ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">AI Model Fleet</span>
      </div>
      <section id="model-fleet" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-2">Multi-Model Routing</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            Four AI models, each selected for its strengths. Tasks are routed to the optimal model based on capability, latency, and cost.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {data.modelFleet.map((m, i) => (
            <Reveal key={m.model} delay={i * 70}>
              <div className="border-t-2 pt-5" style={{ borderColor: MODEL_ACCENT[m.model] || "#e5e2dd" }}>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <p className="font-newsreader text-[1.15rem] text-ink leading-snug">{m.model}</p>
                  <span className="font-inter text-label-caps text-on-surface-variant/60 uppercase tracking-[0.1em] shrink-0">{m.provider}</span>
                </div>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-2">{m.role}</p>
                <p className="font-inter text-[0.78rem] text-on-surface-variant/60 uppercase tracking-[0.08em]">{m.strength}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== ENGINEERING DECISIONS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Engineering Decisions</span>
      </div>
      <section id="decisions" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Design Rationale</h2>
        </Reveal>
        <div>
          {data.engineeringDecisions.map((d, i) => {
            const isOpen = expandedDecisions[i];
            return (
              <Reveal key={i} delay={i * 40}>
                <div className="border-b border-surface-variant">
                  <button type="button" aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                    onClick={() => toggleDecision(i)}>
                    <div className="flex items-start gap-4">
                      <span className={`font-inter text-label-caps uppercase tracking-[0.1em] shrink-0 mt-0.5 ${CATEGORY_COLOR[d.category] || "text-on-surface-variant"}`}>
                        {d.category}
                      </span>
                      <p className="font-newsreader text-[1.1rem] text-ink group-hover:opacity-80 transition-opacity leading-snug">
                        {d.question}
                      </p>
                    </div>
                    <FiChevronDown size={16} className={`shrink-0 mt-1 text-on-surface-variant/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="pb-6 pl-[5.5rem] space-y-4">
                      <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{d.answer}</p>
                      <div className="flex items-start gap-3">
                        <span className="font-inter text-label-caps text-on-surface-variant/50 uppercase tracking-[0.1em] shrink-0 mt-px">Trade-off</span>
                        <p className="font-inter text-[0.82rem] text-on-surface-variant/80 leading-relaxed">{d.tradeoff}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== DATABASE DESIGN ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Database Design</span>
      </div>
      <section id="database" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Schema Overview</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-6">
            Azure SQL with {data.dbSchema.tableCount} tables across discovery, analysis, generation, and analytics domains.
            Background jobs persist to SQL with automatic stale-job cleanup (30-minute timeout).
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="border border-surface-variant p-4">
            <DatabaseSchema schema={data.dbSchema} />
          </div>
          <p className="font-inter text-[0.75rem] text-on-surface-variant/60 mt-2 italic">Key tables and relationships (simplified)</p>
        </Reveal>
      </section>

      {/* ===== TECH STACK ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Tech Stack</span>
      </div>
      <section id="tech-stack" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-8">Built With</h2>
        </Reveal>
        <div className="space-y-10">
          {Object.entries(data.techStack).map(([category, items], i) => (
            <Reveal key={category} delay={i * 70}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <h3 className="font-newsreader text-[1.2rem] text-ink leading-tight capitalize">{category}</h3>
                </div>
                <div className="md:col-span-9 space-y-2">
                  {items.map((item) => (
                    <p key={item} className="font-inter text-body-md text-on-surface-variant">
                      <span className="text-ink font-medium">{item.split(/[·,]/)[0].trim()}</span>
                      {(item.includes("·") || item.includes(",")) && (
                        <span className="text-on-surface-variant"> / {item.split(/[·,]/).slice(1).join(" ").trim()}</span>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Results</span>
      </div>
      <section id="results" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Impact</h2>
        </Reveal>
        <div>
          {data.results.map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="grid grid-cols-12 gap-6 border-b border-surface-variant py-6 items-baseline">
                <div className="col-span-3">
                  <p className="font-newsreader text-[1.75rem] text-ink leading-none">{r.metric}</p>
                </div>
                <div className="col-span-9">
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{r.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {data.constraints?.length > 0 && (
          <Reveal delay={200}>
            <div className="mt-6 space-y-1">
              {data.constraints.map((c, i) => (
                <p key={i} className="font-inter text-[0.78rem] text-on-surface-variant/50 italic">{c}</p>
              ))}
            </div>
          </Reveal>
        )}
      </section>

      {/* ===== WHAT'S NEXT ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">What's Next</span>
      </div>
      <section id="next" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Roadmap</h2>
        </Reveal>
        <div className="space-y-3">
          {data.nextUpdates.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="flex items-baseline gap-3">
                <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">—</span>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== FOOTER NAV ===== */}
      <Reveal>
        <div className="border-t border-surface-variant pt-10 flex flex-wrap items-center justify-between gap-4">
          <button type="button" onClick={() => navigate("/project")}
            className="flex items-center gap-2 font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors uppercase tracking-[0.1em]">
            <FiArrowLeft className="text-base" />
            All Projects
          </button>
          <Link to="/research"
            className="font-inter text-[0.8rem] text-ink border-b border-ink/40 pb-px hover:border-ink transition-colors no-underline">
            Read Research &rarr;
          </Link>
        </div>
      </Reveal>

    </main>
  );
}

export default RFPPlatformProject;
