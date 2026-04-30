import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";
import data from "./data";


const toc = [
  { id: "overview",     label: "Overview" },
  { id: "problem",      label: "The Itch" },
  { id: "solution",     label: "The Concept" },
  { id: "workflow",     label: "Deployment Flow" },
  { id: "experience",   label: "In Action" },
  { id: "architecture", label: "Under the Hood" },
  { id: "results",      label: "What It Proved" },
  { id: "next",         label: "Where It Goes" },
];

function AgentFlowProject() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (src, alt, caption) => { setZoom(1); setLightbox({ src, alt, caption }); };
  const closeLightbox = () => setLightbox(null);
  const zoomIn  = () => setZoom((z) => Math.min(z + 0.25, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => setZoom(1);
  const handleWheel = (e) => { e.preventDefault(); if (e.deltaY < 0) zoomIn(); else zoomOut(); };

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [lightbox]);

  const zoomClick = (src, alt, caption) => ({
    className: "cursor-zoom-in",
    role: "button",
    tabIndex: 0,
    onClick: () => openLightbox(src, alt, caption),
    onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(src, alt, caption); } },
  });

  const experienceSteps = data.sections.find((s) => s.id === "experience")?.steps || [];
  const gallerySteps = experienceSteps.filter((s) => s.image);

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const touchStartX = useRef(null);

  const goPrev = () => setActiveStepIdx((i) => Math.max(0, i - 1));
  const goNext = () => setActiveStepIdx((i) => Math.min(gallerySteps.length - 1, i + 1));

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
    touchStartX.current = null;
  };

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
      <section className="mb-16">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {["Proof of Concept", "Internal Tool", "Private / SSO"].map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && <span className="text-on-surface-variant/40 text-xs">·</span>}
                <span className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">{tag}</span>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-newsreader text-h1 text-ink mb-4">AgentFlow</h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="h-[1px] w-16 bg-ink mb-6"></div>
          <p className="font-newsreader text-[1.5rem] italic text-ink/80 max-w-2xl leading-relaxed">
            What if deploying an AI app felt like clicking Lego blocks together — and any external API could just plug in?
          </p>
        </Reveal>

        {/* Stats */}
        <Reveal delay={300}>
          <div className="flex flex-wrap gap-x-12 gap-y-6 mt-10 pt-8 border-t border-surface-variant mb-10">
            {[
              { value: "3–5 min",     label: "Compose to Live URL" },
              { value: "1,000+ docs", label: "RAG indexed in ~10 min" },
              { value: "Plug-in",     label: "Any API as a Tool" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-newsreader text-[2.25rem] text-ink leading-none mb-1">{s.value}</p>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Stack line */}
        <Reveal delay={350}>
          <p className="font-inter text-[0.78rem] text-on-surface-variant/60 mb-10">
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
          <h2 className="font-newsreader text-h3 text-ink mb-6">The Experiment</h2>
        </Reveal>
        <div className="space-y-4 mb-8">
          {[
            "Built at Bytemethod AI to solve one specific problem: we needed to rapidly prototype and share AI demo concepts with decision-makers — the kind of people who have 10 minutes, not 10 days.",
            "Slide decks don't move people. A working demo does. The challenge was getting from 'idea' to 'live, shareable URL' in minutes instead of days of setup.",
            "Two levels of composition: coarse modules (RAG, Chat, Search, Email — each a standalone deployable) and fine functions (any API registered as a callable tool the LLM discovers at runtime).",
            "The deployment mechanism runs on Docker — each demo spins up its own container, gets a live URL, and can be paused, deleted, or cost-tracked from a single dashboard.",
            "Deliberately limited in scope. A proof of concept, not a finished product — but it works. The plumbing it proves out is the interesting part.",
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="font-inter text-body-md text-on-surface-variant leading-relaxed pl-5 border-l border-surface-variant">{item}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p className="font-newsreader text-[1.3rem] italic text-ink/70 leading-relaxed">
            "We can always edit dirty code, not empty code."
          </p>
        </Reveal>
      </section>

      {/* ===== THE ITCH ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">The Itch</span>
      </div>
      <section id="problem" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Same Setup, Every Demo</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            At Bytemethod AI, we iterate on concepts fast. The job is to take an idea, build something that shows it working, and put it in front of the right people before the conversation moves on. But every new demo required the same boilerplate: spin up a service, wire in an LLM, bolt on RAG or search or email, configure auth, deploy. Then the meeting happens, and you're back to square one for the next concept. The problem wasn't difficulty — it was{" "}
            <strong className="text-ink">repetition</strong>.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="font-newsreader text-[1.1rem] text-ink mb-4">The recurring friction</h3>
          <div className="space-y-3 mb-8">
            {[
              "Each new demo was a one-off build — no shared modules, no reusable pipeline contracts",
              "Spinning up a fresh deployment took hours of setup for what might be a 20-minute conversation",
              "No way to manage running demos centrally — no visibility into what was still live or what it was costing",
              "Adding a new API to an existing demo meant touching the orchestration layer — slow and error-prone",
            ].map((p, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">—</span>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-newsreader text-[1.3rem] italic text-ink/70 leading-relaxed">
            "We didn't need a better AI — we needed better plumbing."
          </p>
        </Reveal>
      </section>

      {/* ===== THE CONCEPT ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">The Concept</span>
      </div>
      <section id="solution" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Compose. Register. Deploy.</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            AgentFlow is built around one idea: <strong className="text-ink">AI capabilities should snap together like pre-built blocks</strong>, and every deployed demo should be a managed, trackable container — not a forgotten server someone has to manually clean up.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {[
            {
              title: "Module-level composition",
              body:  "RAG, Chat, Search, Email — each is a standalone, deployable service built from a shared library. Pick what you need; the platform assembles the runtime. No shared state, no hard dependencies.",
            },
            {
              title: "Docker-based auto-deployment",
              body:  "Each demo spins up in its own Docker container and gets a live, isolated URL. No YAML, no manual config — the platform handles provisioning from a prebuilt base image.",
            },
            {
              title: "Container lifecycle dashboard",
              body:  "Every running demo is visible in a central panel. Spin up, pause, delete, and track cost per container — all in a few clicks. No hunting for running instances or surprise cloud bills.",
            },
            {
              title: "Function-level registration",
              body:  "Any API — internal microservice or external endpoint — can register itself as a tool with a schema. The LLM discovers available tools at runtime and routes calls accordingly. External APIs plug in without code changes on the host side.",
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="border-t border-surface-variant pt-5">
                <h3 className="font-newsreader text-[1.15rem] text-ink mb-2">{f.title}</h3>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== DEPLOYMENT FLOW ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Deployment Flow</span>
      </div>
      <section id="workflow" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">How a demo actually goes live</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            From a description to a live, isolated app URL — no YAML, no manual container configuration.
          </p>
        </Reveal>
        <div>
          {[
            "User describes the concept in plain language — what the demo should do, what capabilities it needs (RAG, Chat, Search, Email)",
            "Platform maps the request to a set of pre-built modules and pre-registered tool APIs",
            "A configuration form is generated: deployment constraints, expiry, access level, optional document upload for RAG",
            "Backend compiles a deployment plan: selects the appropriate Docker base image, wires selected modules, prepares secrets",
            "Deploy API spins up a new Docker container (via Azure Container Apps), injects config, returns a live URL in 3–5 minutes",
            "If RAG was selected: document uploader activates, files are chunked and indexed into FAISS inside the provisioned container",
            "The running container appears in the management dashboard — track cost, pause, resume, or delete with one click",
          ].map((step, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="grid grid-cols-12 gap-4 border-b border-surface-variant py-5">
                <div className="col-span-1">
                  <span className="font-newsreader text-[1.75rem] text-on-surface-variant/25 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-11 pt-1">
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{step}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== IN ACTION ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">In Action</span>
      </div>
      <section id="experience" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-2">The interface we built to prove it</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-10">
            A walkthrough of the actual deployment flow — from intent to live URL — running on the POC. Click any step to jump to its screen.
          </p>
        </Reveal>

        {/* Step list — text only, clickable */}
        <div className="mb-10">
          {experienceSteps.map((step, i) => {
            const galleryIdx = gallerySteps.indexOf(step);
            const isActive = galleryIdx !== -1 && galleryIdx === activeStepIdx;
            return (
              <Reveal key={i} delay={i * 50}>
                <div
                  onClick={() => galleryIdx !== -1 && setActiveStepIdx(galleryIdx)}
                  className={`grid grid-cols-12 gap-4 border-b border-surface-variant py-5 transition-colors ${galleryIdx !== -1 ? "cursor-pointer group" : ""}`}
                >
                  <div className="col-span-1">
                    <span className={`font-newsreader text-[1.75rem] leading-none select-none transition-colors ${isActive ? "text-ink" : "text-on-surface-variant/25 group-hover:text-on-surface-variant/50"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-11 pt-1">
                    <h3 className={`font-newsreader text-[1.15rem] leading-snug mb-1 transition-colors ${isActive ? "text-ink" : "text-on-surface-variant group-hover:text-ink"}`}>
                      {step.title.replace(/^\d+\.\s*/, "")}
                      {galleryIdx !== -1 && (
                        <span className="ml-2 font-inter text-[0.65rem] text-on-surface-variant/40 uppercase tracking-widest align-middle">
                          → see screen
                        </span>
                      )}
                    </h3>
                    <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Gallery viewer */}
        {gallerySteps.length > 0 && (
          <Reveal delay={100}>
            <div className="bg-[#0f0f0f] shadow-[0_12px_48px_rgba(0,0,0,0.18)]">

              {/* Main image */}
              <div
                className="p-4 cursor-zoom-in select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                {...zoomClick(
                  gallerySteps[activeStepIdx].image,
                  gallerySteps[activeStepIdx].title,
                  gallerySteps[activeStepIdx].caption
                )}
              >
                <img
                  key={activeStepIdx}
                  src={gallerySteps[activeStepIdx].image}
                  alt={gallerySteps[activeStepIdx].title}
                  loading="lazy"
                  className="w-full"
                />
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-1.5 px-4 pb-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                {gallerySteps.map((step, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStepIdx(i)}
                    className={`shrink-0 w-20 h-14 overflow-hidden transition-opacity ${i === activeStepIdx ? "opacity-100 ring-1 ring-white/50" : "opacity-35 hover:opacity-65"}`}
                  >
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>

              {/* Controls bar */}
              <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={activeStepIdx === 0}
                    className="font-inter text-[0.72rem] text-white/50 hover:text-white disabled:opacity-20 transition-colors uppercase tracking-widest"
                  >
                    ← Prev
                  </button>
                  <span className="font-inter text-[0.72rem] text-white/25 tabular-nums">
                    {String(activeStepIdx + 1).padStart(2, "0")} / {String(gallerySteps.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={activeStepIdx === gallerySteps.length - 1}
                    className="font-inter text-[0.72rem] text-white/50 hover:text-white disabled:opacity-20 transition-colors uppercase tracking-widest"
                  >
                    Next →
                  </button>
                </div>
                {gallerySteps[activeStepIdx].caption && (
                  <p className="font-inter text-[0.72rem] text-white/35 italic text-right max-w-sm leading-relaxed hidden md:block">
                    {gallerySteps[activeStepIdx].caption}
                  </p>
                )}
              </div>

            </div>
          </Reveal>
        )}
      </section>

      {/* ===== UNDER THE HOOD ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Under the Hood</span>
      </div>
      <section id="architecture" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-6">Technical Design</h2>
        </Reveal>
        <div className="space-y-4 mb-10">
          {[
            'Modular service library: each capability (RAG, Search, Email, Chat) is an independently deployable service built from a shared base. Standard request/response contracts make them interchangeable.',
            "Docker-based auto-provisioning: a Deploy API wraps the Azure Container Apps SDK to spin up isolated containers from prebuilt ACR images. Injects secrets, wires networking, returns a URL — the caller never touches a Dockerfile.",
            "Container management layer: all running instances are tracked centrally. The dashboard exposes cost per container, uptime, and one-click controls — spin up, pause, resume, delete. No orphaned deployments.",
            "Enterprise RAG via LangChain + FAISS: SharePoint ingestion, automatic chunking, citation-ready sources — all self-contained in the RAG module.",
            "DSPy + GEPA for prompt optimization: prompts are iterated using evaluation-driven rubrics across the shared module library, not tuned per-deployment.",
          ].map((m, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="font-inter text-body-md text-on-surface-variant leading-relaxed pl-5 border-l border-surface-variant">{m}</p>
            </Reveal>
          ))}
        </div>

        {/* Tool registration — the interesting bit */}
        <Reveal delay={200}>
          <div className="border-t border-surface-variant pt-8">
            <h3 className="font-newsreader text-[1.2rem] text-ink mb-2">The interesting bit: dynamic tool registration</h3>
            <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-4">
              Early prototypes had hardcoded tool calls baked into the orchestration layer. Adding a new capability meant touching the core. That's the wrong model.
            </p>
            <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-6">
              The POC switches to a <strong className="text-ink">registration pattern</strong> inspired by MCP (Model Context Protocol): each tool — whether it's an internal module or an external API borrowed from another app — registers itself with a schema. At runtime, the LLM asks <em>"what tools are available?"</em> and gets back a live list. Tool calls are then routed by name, not hardcoded.
            </p>
            <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-6">
              This means a Serper web search endpoint, an internal email service, or literally any REST API with a schema can become a first-class capability in the platform — without touching the orchestration code.
            </p>
            <div className="space-y-3">
              {[
                "Services register with a schema: name, description, input/output contract, examples",
                "Orchestrator exposes a 'list tools' endpoint — LLM reads it at the start of each session",
                "Tool calls are executed via a unified dispatch: tool_name + arguments → right service",
                "External APIs are proxied — the host app doesn't change, just its schema is registered",
              ].map((item, i) => (
                <div key={i} className="flex items-baseline gap-3">
                  <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">—</span>
                  <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== WHAT IT PROVED ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">What It Proved</span>
      </div>
      <section id="results" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-2">The experiment worked</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            The core mechanism holds. Composing from pre-built modules, deploying via Docker, and managing containers from a dashboard is a viable approach — at least at this stage. Demos that used to take days to set up now take minutes to share.
          </p>
        </Reveal>
        <div>
          {[
            "Deployment time: 3–5 minutes from description to live URL. The container spin-up is the bottleneck — the composition step is instant.",
            "Container management works: running demos are visible in the dashboard, cost is tracked per instance, and pausing or deleting takes one click.",
            "Document indexing: ~1,000 documents indexed in ~10 minutes inside a freshly provisioned RAG container — the module is self-contained.",
            "Tool registration works: external APIs (Serper search) integrated as registered tools without modifying the orchestration layer. The LLM discovered them correctly at runtime.",
            "Scope is honestly limited: this is a single-team POC at Bytemethod AI. Multi-tenancy, schema versioning, tool auth — none of that is solved here. The interesting thing is the shape of the problem, not the production readiness.",
          ].map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="flex items-baseline gap-4 border-b border-surface-variant py-5">
                <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">—</span>
                <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{r}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="font-inter text-[0.78rem] text-on-surface-variant/50 mt-4 italic">
            Private internal project. No source code or real documents can be shared.
          </p>
        </Reveal>
      </section>

      {/* ===== WHERE IT GOES ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-10">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">Where It Goes</span>
      </div>
      <section id="next" className="mb-xl">
        <Reveal>
          <h2 className="font-newsreader text-h3 text-ink mb-4">Tool Gateway Service</h2>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-4">
            The natural next step from a registration pattern is a proper <strong className="text-ink">Tool Gateway</strong> — a dedicated service that owns registration, schema versioning, auth/permissions per tool, observability, rate limiting, and structured failure handling.
          </p>
          <p className="font-inter text-body-md text-on-surface-variant leading-relaxed mb-8">
            Think of it as an <strong className="text-ink">API gateway, but the clients are AI agents</strong>. Any team publishes a tool — internal service or third-party API. Any agent in the org can discover and call it. No central coordination, no orchestration rewrites. This POC is the smallest version of that idea.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
            <div>
              <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em] mb-5">Open problems</p>
              <div className="space-y-3">
                {[
                  "Schema versioning — what happens when a registered tool's contract changes?",
                  "Tool auth — not every API should be callable by every agent",
                  "Failure contracts — structured errors and retry semantics across tool calls",
                  "Discoverability at scale — efficient tool search when the registry grows large",
                ].map((item, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <span className="font-inter text-[0.7rem] text-on-surface-variant/40 uppercase tracking-widest shrink-0">—</span>
                    <p className="font-inter text-body-md text-on-surface-variant leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0f0f0f] p-3 shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden self-start cursor-zoom-in"
                 {...zoomClick(
                   "/assets/projects/agentflow/Gemini_Generated_Image_3gx6fp3gx6fp3gx6.png",
                   "Tool Gateway Service Vision",
                   "A centralized gateway: any tool registers, any agent discovers it."
                 )}>
              <img src="/assets/projects/agentflow/Gemini_Generated_Image_3gx6fp3gx6fp3gx6.png"
                   alt="Tool Gateway Service Vision" loading="lazy" className="w-full" />
            </div>
          </div>
        </Reveal>
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

      {/* ===== LIGHTBOX ===== */}
      {lightbox && createPortal(
        <div role="dialog" aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 flex flex-col items-center justify-center"
          onMouseDown={closeLightbox} onWheel={handleWheel}>
          <button type="button" aria-label="Close image" onClick={closeLightbox}
            className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl font-light leading-none z-10 cursor-pointer">
            &times;
          </button>
          <div className="absolute bottom-5 flex items-center gap-2 z-10" onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Zoom out" disabled={zoom <= 0.5} onClick={zoomOut}
              className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-lg disabled:opacity-30">−</button>
            <button type="button" onClick={resetZoom}
              className="px-3 h-8 bg-white/10 hover:bg-white/20 text-white font-inter text-[0.75rem] min-w-[3.5rem]">
              {Math.round(zoom * 100)}%
            </button>
            <button type="button" aria-label="Zoom in" disabled={zoom >= 4} onClick={zoomIn}
              className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-lg disabled:opacity-30">+</button>
          </div>
          <div className="max-w-[90vw] max-h-[80vh] overflow-auto"
               style={{ cursor: zoom > 1 ? "grab" : "default" }}
               onMouseDown={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt || ""} draggable={false} className="block"
                 style={{ transform: `scale(${zoom})`, transformOrigin: "top left", transition: "transform 0.15s ease" }} />
          </div>
          {lightbox.caption && (
            <p className="absolute bottom-14 font-inter text-[0.8rem] text-white/60 max-w-lg text-center px-4"
               onMouseDown={(e) => e.stopPropagation()}>
              {lightbox.caption}
            </p>
          )}
        </div>,
        document.body
      )}

    </main>
  );
}

export default AgentFlowProject;
